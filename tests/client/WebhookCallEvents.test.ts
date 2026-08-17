import { describe, it, expect } from '@jest/globals';
import { EventEmitter } from 'events';
import { WebhookHandler, EventType } from '../../src/client/webhook/handlers/WebhookHandler';

/**
 * Tests for webhook parsing of the `calls` field (Business Calling API, beta).
 */

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
  body = '';

  writeHead(status: number): void {
    this.statusCode = status;
  }

  end(body?: string): void {
    if (body) this.body = body;
  }
}

describe('WebhookHandler - calls field', () => {
  it('emits CALL_EVENT for each entry in the calls webhook field', async () => {
    const client = new EventEmitter();
    const handler = new WebhookHandler(client as any, 'verify-token');
    const callEvents: any[] = [];
    handler.on(EventType.CALL_EVENT, (data) => callEvents.push(data));

    const payload = JSON.stringify({
      object: 'whatsapp_business_account',
      entry: [
        {
          changes: [
            {
              field: 'calls',
              value: {
                messaging_product: 'whatsapp',
                calls: [
                  { id: 'call_1', from: '5491155551234', to: '1234567890', event: 'connect' },
                ],
              },
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

    expect(res.statusCode).toBe(200);
    expect(callEvents).toHaveLength(1);
    expect(callEvents[0]).toEqual({ id: 'call_1', from: '5491155551234', to: '1234567890', event: 'connect' });
  });

  it('does not emit CALL_EVENT for unrelated fields', async () => {
    const client = new EventEmitter();
    const handler = new WebhookHandler(client as any, 'verify-token');
    const callEvents: any[] = [];
    handler.on(EventType.CALL_EVENT, (data) => callEvents.push(data));

    const payload = JSON.stringify({
      object: 'whatsapp_business_account',
      entry: [{ changes: [{ field: 'messages', value: { messages: [] } }] }],
    });

    const req = new FakeRequest();
    const res = new FakeResponse();

    const promise = handler.handleRequest(req as any, res as any);
    req.sendBody(payload);
    await promise;

    expect(callEvents).toHaveLength(0);
  });
});
