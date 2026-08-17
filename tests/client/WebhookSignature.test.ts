import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { EventEmitter } from 'events';
import { createHmac } from 'crypto';
import { WebhookHandler, EventType } from '../../src/client/webhook/handlers/WebhookHandler';

/**
 * Tests for webhook payload signature validation (X-Hub-Signature-256).
 */

const APP_SECRET = 'super-secret-app-secret';

function sign(body: string, secret: string = APP_SECRET): string {
  return `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
}

// Minimal fake IncomingMessage: an EventEmitter with a headers bag
class FakeRequest extends EventEmitter {
  method = 'POST';
  headers: Record<string, string | string[] | undefined> = {};

  sendBody(body: string): void {
    this.emit('data', Buffer.from(body));
    this.emit('end');
  }
}

class FakeResponse {
  statusCode = 0;
  headers: Record<string, string> = {};
  body = '';

  writeHead(status: number, headers: Record<string, string>): void {
    this.statusCode = status;
    this.headers = headers;
  }

  end(body?: string): void {
    if (body) this.body = body;
  }
}

const validPayload = JSON.stringify({
  object: 'whatsapp_business_account',
  entry: [
    {
      changes: [
        {
          field: 'messages',
          value: {
            messages: [{ id: 'wamid.1', from: '5491100000000', timestamp: '123', type: 'text', text: { body: 'hi' } }],
          },
        },
      ],
    },
  ],
});

describe('WebhookHandler - Signature validation', () => {
  let client: any;

  beforeEach(() => {
    client = new EventEmitter();
  });

  describe('static verifySignature', () => {
    it('returns true for a matching signature', () => {
      const signature = sign(validPayload);
      expect(WebhookHandler.verifySignature(validPayload, signature, APP_SECRET)).toBe(true);
    });

    it('returns false when the body was tampered with', () => {
      const signature = sign(validPayload);
      expect(WebhookHandler.verifySignature(validPayload + 'tampered', signature, APP_SECRET)).toBe(false);
    });

    it('returns false for a signature produced with the wrong secret', () => {
      const signature = sign(validPayload, 'wrong-secret');
      expect(WebhookHandler.verifySignature(validPayload, signature, APP_SECRET)).toBe(false);
    });

    it('returns false when the header is missing', () => {
      expect(WebhookHandler.verifySignature(validPayload, undefined, APP_SECRET)).toBe(false);
      expect(WebhookHandler.verifySignature(validPayload, null, APP_SECRET)).toBe(false);
    });

    it('returns false when the header is missing the sha256= prefix', () => {
      const digest = createHmac('sha256', APP_SECRET).update(validPayload).digest('hex');
      expect(WebhookHandler.verifySignature(validPayload, digest, APP_SECRET)).toBe(false);
    });

    it('works with a Buffer body', () => {
      const signature = sign(validPayload);
      expect(WebhookHandler.verifySignature(Buffer.from(validPayload), signature, APP_SECRET)).toBe(true);
    });
  });

  describe('handleWebhookEvent integration', () => {
    it('processes the event when the signature is valid', async () => {
      const handler = new WebhookHandler(client, 'verify-token', APP_SECRET);
      const receivedEvents: any[] = [];
      handler.on(EventType.MESSAGE_RECEIVED, (data) => receivedEvents.push(data));

      const req = new FakeRequest();
      req.headers['x-hub-signature-256'] = sign(validPayload);
      const res = new FakeResponse();

      const promise = handler.handleRequest(req as any, res as any);
      req.sendBody(validPayload);
      await promise;

      expect(res.statusCode).toBe(200);
      expect(receivedEvents).toHaveLength(1);
      expect(receivedEvents[0].id).toBe('wamid.1');
    });

    it('rejects the request with 401 when the signature is invalid', async () => {
      const handler = new WebhookHandler(client, 'verify-token', APP_SECRET);
      const receivedEvents: any[] = [];
      handler.on(EventType.MESSAGE_RECEIVED, (data) => receivedEvents.push(data));

      const req = new FakeRequest();
      req.headers['x-hub-signature-256'] = 'sha256=deadbeef';
      const res = new FakeResponse();

      const promise = handler.handleRequest(req as any, res as any);
      req.sendBody(validPayload);
      await promise;

      expect(res.statusCode).toBe(401);
      expect(receivedEvents).toHaveLength(0);
    });

    it('rejects the request with 401 when the signature header is missing', async () => {
      const handler = new WebhookHandler(client, 'verify-token', APP_SECRET);
      const req = new FakeRequest();
      const res = new FakeResponse();

      const promise = handler.handleRequest(req as any, res as any);
      req.sendBody(validPayload);
      await promise;

      expect(res.statusCode).toBe(401);
    });

    it('skips validation entirely when no app secret is configured (backward compatible)', async () => {
      const handler = new WebhookHandler(client, 'verify-token');
      const receivedEvents: any[] = [];
      handler.on(EventType.MESSAGE_RECEIVED, (data) => receivedEvents.push(data));

      const req = new FakeRequest();
      const res = new FakeResponse();

      const promise = handler.handleRequest(req as any, res as any);
      req.sendBody(validPayload);
      await promise;

      expect(res.statusCode).toBe(200);
      expect(receivedEvents).toHaveLength(1);
    });
  });

  describe('Unhandled webhook fields', () => {
    it('emits a generic WEBHOOK_EVENT for fields with no dedicated handler', async () => {
      const handler = new WebhookHandler(client, 'verify-token');
      const genericEvents: any[] = [];
      handler.on(EventType.WEBHOOK_EVENT, (data) => genericEvents.push(data));

      const payload = JSON.stringify({
        object: 'whatsapp_business_account',
        entry: [
          {
            changes: [
              {
                field: 'message_template_status_update',
                value: { event: 'APPROVED', message_template_id: '12345' },
              },
            ],
          },
        ],
      });

      const req = new FakeRequest();
      const res = new FakeResponse();

      const promise = handler.handleRequest(req as any, res as any);
      req.sendBody(payload);
      await promise;

      expect(genericEvents).toHaveLength(1);
      expect(genericEvents[0].field).toBe('message_template_status_update');
      expect(genericEvents[0].value.event).toBe('APPROVED');
    });
  });
});
