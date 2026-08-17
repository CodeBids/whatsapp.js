import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { GroupManager } from '../../src/client/actions/Groups';

/**
 * Tests for GroupManager (WhatsApp Groups API).
 */

function createMockClient() {
  return {
    makeApiRequest: jest
      .fn<(endpoint: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
    makeGraphRequest: jest
      .fn<(path: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
    updateGroupProfilePicture: jest
      .fn<(groupId: string, buffer: Buffer, extraFields?: Record<string, string>) => Promise<any>>()
      .mockResolvedValue({ success: true }),
  };
}

describe('GroupManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: GroupManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new GroupManager(client as any);
  });

  describe('create', () => {
    it('creates a group with a subject', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ id: 'group_1' });

      const result = await manager.create({ subject: 'Support Team' });

      expect(result.id).toBe('group_1');
      expect(client.makeApiRequest).toHaveBeenCalledWith('groups', 'POST', {
        messaging_product: 'whatsapp',
        subject: 'Support Team',
      });
    });

    it('includes description and joinApprovalMode when provided', async () => {
      await manager.create({
        subject: 'Support Team',
        description: 'Customer support group',
        joinApprovalMode: 'approval_required',
      });

      expect(client.makeApiRequest).toHaveBeenCalledWith('groups', 'POST', {
        messaging_product: 'whatsapp',
        subject: 'Support Team',
        description: 'Customer support group',
        join_approval_mode: 'approval_required',
      });
    });

    it('rejects a missing subject', async () => {
      await expect(manager.create({ subject: '' })).rejects.toThrow(/subject is required/);
    });

    it('rejects a subject over 128 characters', async () => {
      await expect(manager.create({ subject: 'a'.repeat(129) })).rejects.toThrow(/128 characters or less/);
    });

    it('rejects a description over 2048 characters', async () => {
      await expect(manager.create({ subject: 'ok', description: 'a'.repeat(2049) }))
        .rejects.toThrow(/2048 characters or less/);
    });
  });

  describe('list', () => {
    it('lists groups without params', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ data: [] });

      await manager.list();

      expect(client.makeApiRequest).toHaveBeenCalledWith('groups', 'GET');
    });

    it('applies pagination params', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ data: [] });

      await manager.list({ limit: 10, after: 'cursor1' });

      const path = client.makeApiRequest.mock.calls[0][0];
      expect(path).toContain('limit=10');
      expect(path).toContain('after=cursor1');
    });
  });

  describe('get', () => {
    it('gets group details with default fields', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ id: 'group_1', subject: 'Support Team' });

      const result = await manager.get('group_1');

      expect(result.subject).toBe('Support Team');
      expect(client.makeGraphRequest).toHaveBeenCalledWith(expect.stringMatching(/^group_1\?fields=/), 'GET');
    });

    it('throws when groupId is missing', async () => {
      await expect(manager.get('')).rejects.toThrow(/groupId is required/);
    });
  });

  describe('update', () => {
    it('updates subject and description via JSON when no picture is given', async () => {
      await manager.update('group_1', { subject: 'New name', description: 'New description' });

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1', 'POST', {
        messaging_product: 'whatsapp',
        subject: 'New name',
        description: 'New description',
      });
      expect(client.updateGroupProfilePicture).not.toHaveBeenCalled();
    });

    it('uploads a profile picture via multipart when provided', async () => {
      const buffer = Buffer.from('fake-jpeg-bytes');

      await manager.update('group_1', { subject: 'New name', profilePicture: buffer });

      expect(client.updateGroupProfilePicture).toHaveBeenCalledWith('group_1', buffer, { subject: 'New name' });
      expect(client.makeGraphRequest).not.toHaveBeenCalled();
    });

    it('throws when groupId is missing', async () => {
      await expect(manager.update('', { subject: 'x' })).rejects.toThrow(/groupId is required/);
    });

    it('throws when no fields are provided', async () => {
      await expect(manager.update('group_1', {})).rejects.toThrow(/Provide at least a subject, description or profilePicture/);
    });
  });

  describe('delete', () => {
    it('deletes a group', async () => {
      await manager.delete('group_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1', 'DELETE');
    });

    it('throws when groupId is missing', async () => {
      await expect(manager.delete('')).rejects.toThrow(/groupId is required/);
    });
  });

  describe('invite links', () => {
    it('gets the current invite link', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ invite_link: 'https://chat.whatsapp.com/ABC' });

      const result = await manager.getInviteLink('group_1');

      expect(result.invite_link).toBe('https://chat.whatsapp.com/ABC');
      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1/invite_link', 'GET');
    });

    it('resets the invite link', async () => {
      await manager.resetInviteLink('group_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1/invite_link', 'POST', {
        messaging_product: 'whatsapp',
      });
    });
  });

  describe('removeParticipants', () => {
    it('removes participants', async () => {
      await manager.removeParticipants('group_1', ['5491100000000', '5491111111111']);

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1/participants', 'DELETE', {
        messaging_product: 'whatsapp',
        participants: [{ user: '5491100000000' }, { user: '5491111111111' }],
      });
    });

    it('throws when the list is empty', async () => {
      await expect(manager.removeParticipants('group_1', [])).rejects.toThrow(/At least one participant/);
    });

    it('throws when more than 8 participants are given', async () => {
      const waIds = Array.from({ length: 9 }, (_, i) => `54911000000${i}`);
      await expect(manager.removeParticipants('group_1', waIds)).rejects.toThrow(/maximum of 8 participants/);
    });
  });

  describe('join requests', () => {
    it('lists pending join requests', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.getJoinRequests('group_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1/join_requests', 'GET');
    });

    it('approves join requests', async () => {
      await manager.approveJoinRequests('group_1', ['req_1', 'req_2']);

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1/join_requests', 'POST', {
        messaging_product: 'whatsapp',
        join_requests: ['req_1', 'req_2'],
      });
    });

    it('rejects join requests', async () => {
      await manager.rejectJoinRequests('group_1', ['req_1']);

      expect(client.makeGraphRequest).toHaveBeenCalledWith('group_1/join_requests', 'DELETE', {
        messaging_product: 'whatsapp',
        join_requests: ['req_1'],
      });
    });

    it('throws when no IDs are given to approve/reject', async () => {
      await expect(manager.approveJoinRequests('group_1', [])).rejects.toThrow(/At least one join request ID/);
      await expect(manager.rejectJoinRequests('group_1', [])).rejects.toThrow(/At least one join request ID/);
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeApiRequest.mockRejectedValueOnce(new Error('API Error'));

      await expect(manager.create({ subject: 'x' })).rejects.toThrow('API Error');
    });
  });
});
