import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ConversationalAutomationManager } from '../../src/client/actions/ConversationalAutomation';

/**
 * Tests for ConversationalAutomationManager (Conversational Components API).
 */

function createMockClient() {
  return {
    makeApiRequest: jest
      .fn<(endpoint: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
  };
}

describe('ConversationalAutomationManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: ConversationalAutomationManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new ConversationalAutomationManager(client as any);
  });

  describe('get', () => {
    it('reads and unwraps the conversational_automation field', async () => {
      client.makeApiRequest.mockResolvedValueOnce({
        conversational_automation: {
          enable_welcome_message: true,
          commands: [{ command_name: 'tickets', command_description: 'Book flight tickets' }],
          prompts: ['Book a flight'],
        },
      });

      const result = await manager.get();

      expect(result.enable_welcome_message).toBe(true);
      expect(result.commands).toHaveLength(1);
      expect(client.makeApiRequest).toHaveBeenCalledWith('?fields=conversational_automation', 'GET');
    });
  });

  describe('update', () => {
    it('updates the welcome message toggle', async () => {
      await manager.update({ enableWelcomeMessage: true });

      expect(client.makeApiRequest).toHaveBeenCalledWith('conversational_automation', 'POST', {
        enable_welcome_message: true,
      });
    });

    it('updates commands', async () => {
      const commands = [{ command_name: 'tickets', command_description: 'Book flight tickets' }];

      await manager.update({ commands });

      expect(client.makeApiRequest).toHaveBeenCalledWith('conversational_automation', 'POST', { commands });
    });

    it('updates prompts', async () => {
      await manager.update({ prompts: ['Book a flight', 'Plan a vacation'] });

      expect(client.makeApiRequest).toHaveBeenCalledWith('conversational_automation', 'POST', {
        prompts: ['Book a flight', 'Plan a vacation'],
      });
    });

    it('combines multiple fields in a single update', async () => {
      await manager.update({ enableWelcomeMessage: false, prompts: ['Hi'] });

      expect(client.makeApiRequest).toHaveBeenCalledWith('conversational_automation', 'POST', {
        enable_welcome_message: false,
        prompts: ['Hi'],
      });
    });

    it('throws when no fields are provided', async () => {
      await expect(manager.update({})).rejects.toThrow(/Provide at least one field/);
    });

    it('rejects commands missing a name or description', async () => {
      await expect(
        manager.update({ commands: [{ command_name: 'tickets', command_description: '' }] }),
      ).rejects.toThrow(/command_name and a command_description/);
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeApiRequest.mockRejectedValueOnce(new Error('API Error'));

      await expect(manager.get()).rejects.toThrow('API Error');
    });
  });
});
