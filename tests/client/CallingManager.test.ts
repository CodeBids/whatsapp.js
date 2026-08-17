import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { CallingManager } from '../../src/client/actions/Calling';

/**
 * Tests for CallingManager (Business Calling API, beta).
 */

function createMockClient() {
  return {
    makeApiRequest: jest
      .fn<(endpoint: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ messaging_product: 'whatsapp', calls: [{ id: 'call_1' }] }),
  };
}

describe('CallingManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: CallingManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new CallingManager(client as any);
  });

  describe('connect', () => {
    it('initiates a call without a session', async () => {
      await manager.connect('5491155551234');

      expect(client.makeApiRequest).toHaveBeenCalledWith('calls', 'POST', {
        messaging_product: 'whatsapp',
        to: '5491155551234',
        action: 'connect',
      });
    });

    it('includes an SDP session when provided', async () => {
      const session = { sdp_type: 'offer' as const, sdp: 'v=0...' };
      await manager.connect('5491155551234', session);

      expect(client.makeApiRequest).toHaveBeenCalledWith('calls', 'POST', {
        messaging_product: 'whatsapp',
        to: '5491155551234',
        action: 'connect',
        session,
      });
    });

    it('throws when "to" is missing', async () => {
      await expect(manager.connect('')).rejects.toThrow(/Recipient phone number is required/);
    });
  });

  describe('preAccept / accept', () => {
    const session = { sdp_type: 'answer' as const, sdp: 'v=0...' };

    it('sends a pre_accept action', async () => {
      await manager.preAccept('call_1', session);

      expect(client.makeApiRequest).toHaveBeenCalledWith('calls', 'POST', {
        messaging_product: 'whatsapp',
        call_id: 'call_1',
        action: 'pre_accept',
        session,
      });
    });

    it('sends an accept action', async () => {
      await manager.accept('call_1', session);

      expect(client.makeApiRequest).toHaveBeenCalledWith('calls', 'POST', {
        messaging_product: 'whatsapp',
        call_id: 'call_1',
        action: 'accept',
        session,
      });
    });
  });

  describe('reject / terminate', () => {
    it('sends a reject action', async () => {
      await manager.reject('call_1');

      expect(client.makeApiRequest).toHaveBeenCalledWith('calls', 'POST', {
        messaging_product: 'whatsapp',
        call_id: 'call_1',
        action: 'reject',
      });
    });

    it('sends a terminate action', async () => {
      await manager.terminate('call_1');

      expect(client.makeApiRequest).toHaveBeenCalledWith('calls', 'POST', {
        messaging_product: 'whatsapp',
        call_id: 'call_1',
        action: 'terminate',
      });
    });

    it('throws when callId is missing', async () => {
      await expect(manager.reject('')).rejects.toThrow(/callId is required/);
      await expect(manager.terminate('')).rejects.toThrow(/callId is required/);
    });
  });

  describe('getSettings', () => {
    it('unwraps the calling settings', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ calling: { status: 'ENABLED' } });

      const settings = await manager.getSettings();

      expect(settings).toEqual({ status: 'ENABLED' });
      expect(client.makeApiRequest).toHaveBeenCalledWith('settings?fields=calling', 'GET');
    });
  });

  describe('updateSettings', () => {
    it('sends the settings wrapped under calling', async () => {
      await manager.updateSettings({ status: 'DISABLED' });

      expect(client.makeApiRequest).toHaveBeenCalledWith('settings', 'POST', {
        calling: { status: 'DISABLED' },
      });
    });

    it('throws when no settings are provided', async () => {
      await expect(manager.updateSettings({})).rejects.toThrow(/Provide at least one setting/);
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeApiRequest.mockRejectedValueOnce(new Error('API Error'));

      await expect(manager.connect('5491155551234')).rejects.toThrow('API Error');
    });
  });
});
