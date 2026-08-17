import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Message } from '../../src/client/actions/Message';
import { LanguageCode } from '../../src/types/language';

/**
 * Tests for the "group_id" template parameter type, used to send a group invite link
 * via an approved template message (see the Groups API / client.groups).
 */

function createMockClient() {
  return {
    makeApiRequest: jest
      .fn<(endpoint: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ messaging_product: 'whatsapp', contacts: [], messages: [{ id: 'wamid.1' }] }),
  };
}

describe('Message - group_id template parameter', () => {
  let client: ReturnType<typeof createMockClient>;
  let message: Message;

  beforeEach(() => {
    client = createMockClient();
    message = new Message(client as any);
  });

  it('sends a template with a group_id parameter', async () => {
    await message.send({
      to: '5491155551234',
      template: {
        name: 'group_invite',
        language: LanguageCode.en_US,
        components: [
          {
            type: 'body',
            parameters: [{ type: 'group_id', group_id: '123456789@g.us' }],
          },
        ],
      },
    });

    expect(client.makeApiRequest).toHaveBeenCalledWith(
      'messages',
      'POST',
      expect.objectContaining({
        template: expect.objectContaining({
          name: 'group_invite',
          components: [
            {
              type: 'body',
              parameters: [{ type: 'group_id', group_id: '123456789@g.us' }],
            },
          ],
        }),
      }),
    );
  });

  it('rejects a group_id parameter missing the group_id value', async () => {
    await expect(
      message.send({
        to: '5491155551234',
        template: {
          name: 'group_invite',
          language: LanguageCode.en_US,
          components: [{ type: 'body', parameters: [{ type: 'group_id' } as any] }],
        },
      }),
    ).rejects.toThrow(/group_id is required/);
  });
});
