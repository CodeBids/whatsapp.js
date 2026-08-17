import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { BlockedUsersManager } from '../../src/client/actions/BlockedUsers';

/**
 * Tests for BlockedUsersManager (Block Users API).
 */

function createMockClient() {
  return {
    makeApiRequest: jest
      .fn<(endpoint: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ messaging_product: 'whatsapp', block_users: {} }),
  };
}

describe('BlockedUsersManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: BlockedUsersManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new BlockedUsersManager(client as any);
  });

  describe('block', () => {
    it('blocks a list of WhatsApp IDs', async () => {
      await manager.block(['5491100000000', '5491111111111']);

      expect(client.makeApiRequest).toHaveBeenCalledWith('block_users', 'POST', {
        messaging_product: 'whatsapp',
        block_users: [{ user: '5491100000000' }, { user: '5491111111111' }],
      });
    });

    it('throws when the list is empty', async () => {
      await expect(manager.block([])).rejects.toThrow(/At least one WhatsApp ID/);
      expect(client.makeApiRequest).not.toHaveBeenCalled();
    });
  });

  describe('unblock', () => {
    it('unblocks a list of WhatsApp IDs using DELETE', async () => {
      await manager.unblock(['5491100000000']);

      expect(client.makeApiRequest).toHaveBeenCalledWith('block_users', 'DELETE', {
        messaging_product: 'whatsapp',
        block_users: [{ user: '5491100000000' }],
      });
    });

    it('throws when the list is empty', async () => {
      await expect(manager.unblock([])).rejects.toThrow(/At least one WhatsApp ID/);
    });
  });

  describe('list', () => {
    it('lists blocked users without params', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ data: [] });

      await manager.list();

      expect(client.makeApiRequest).toHaveBeenCalledWith('block_users', 'GET');
    });

    it('applies pagination params', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ data: [] });

      await manager.list({ limit: 25, after: 'cursor1' });

      const path = client.makeApiRequest.mock.calls[0][0];
      expect(path).toContain('block_users?');
      expect(path).toContain('limit=25');
      expect(path).toContain('after=cursor1');
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeApiRequest.mockRejectedValueOnce(new Error('API Error'));

      await expect(manager.block(['5491100000000'])).rejects.toThrow('API Error');
    });
  });
});
