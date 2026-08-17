import { describe, it, expect } from '@jest/globals';
import { EventEmitter } from 'events';
import { WebhookHandler, EventType } from '../../src/client/webhook/handlers/WebhookHandler';

/**
 * Tests for webhook parsing of the group-related fields: group_lifecycle_update,
 * group_participants_update, group_settings_update, group_status_update.
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
  writeHead(status: number): void {
    this.statusCode = status;
  }
  end(): void {}
}

async function fireWebhook(handler: WebhookHandler, field: string, value: unknown): Promise<FakeResponse> {
  const payload = JSON.stringify({
    object: 'whatsapp_business_account',
    entry: [{ changes: [{ field, value }] }],
  });

  const req = new FakeRequest();
  const res = new FakeResponse();

  const promise = handler.handleRequest(req as any, res as any);
  req.sendBody(payload);
  await promise;

  return res;
}

describe('WebhookHandler - group fields', () => {
  const cases: Array<[string, EventType]> = [
    ['group_lifecycle_update', EventType.GROUP_LIFECYCLE_UPDATE],
    ['group_participants_update', EventType.GROUP_PARTICIPANTS_UPDATE],
    ['group_settings_update', EventType.GROUP_SETTINGS_UPDATE],
    ['group_status_update', EventType.GROUP_STATUS_UPDATE],
  ];

  it.each(cases)('emits %s as %s with the raw value', async (field, eventType) => {
    const client = new EventEmitter();
    const handler = new WebhookHandler(client as any, 'verify-token');
    const received: any[] = [];
    handler.on(eventType, (data) => received.push(data));

    const value = { group_id: 'group_1', example: true };
    const res = await fireWebhook(handler, field, value);

    expect(res.statusCode).toBe(200);
    expect(received).toEqual([value]);
  });
});
