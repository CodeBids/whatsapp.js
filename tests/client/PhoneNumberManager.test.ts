import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PhoneNumberManager } from '../../src/client/actions/PhoneNumbers';

/**
 * Tests for PhoneNumberManager (phone number management API).
 */

function createMockClient(overrides: Partial<{ wabaId: string | null; phoneId: string }> = {}) {
  return {
    getPhoneId: jest.fn(() => overrides.phoneId ?? '1234567890'),
    getWabaId: jest.fn(() => (overrides.wabaId === undefined ? '9999999999' : overrides.wabaId)),
    makeGraphRequest: jest
      .fn<(path: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
  };
}

describe('PhoneNumberManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: PhoneNumberManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new PhoneNumberManager(client as any);
  });

  describe('list', () => {
    it('requests the WABA phone number listing with default fields', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.list();

      expect(client.makeGraphRequest).toHaveBeenCalledWith(
        expect.stringMatching(/^9999999999\/phone_numbers\?fields=/),
        'GET',
      );
    });

    it('includes accountMode and pagination params when provided', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.list({ accountMode: 'LIVE', limit: 10, after: 'cursor1' });

      const path = client.makeGraphRequest.mock.calls[0][0];
      expect(path).toContain('account_mode=LIVE');
      expect(path).toContain('limit=10');
      expect(path).toContain('after=cursor1');
    });

    it('throws when wabaId is not configured', async () => {
      client = createMockClient({ wabaId: null });
      manager = new PhoneNumberManager(client as any);

      await expect(manager.list()).rejects.toThrow(/wabaId is required/);
      expect(client.makeGraphRequest).not.toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('defaults to the client\'s own phone number ID', async () => {
      await manager.get();

      expect(client.makeGraphRequest).toHaveBeenCalledWith(expect.stringMatching(/^1234567890\?fields=/), 'GET');
    });

    it('uses the provided phone number ID when given', async () => {
      await manager.get('555');

      expect(client.makeGraphRequest).toHaveBeenCalledWith(expect.stringMatching(/^555\?fields=/), 'GET');
    });
  });

  describe('requestVerificationCode', () => {
    it('sends the code method and language', async () => {
      await manager.requestVerificationCode({ codeMethod: 'SMS', language: 'en' });

      expect(client.makeGraphRequest).toHaveBeenCalledWith('1234567890/request_code', 'POST', {
        code_method: 'SMS',
        language: 'en',
      });
    });

    it('throws when codeMethod is missing', async () => {
      await expect(manager.requestVerificationCode({ codeMethod: '' as any, language: 'en' }))
        .rejects.toThrow(/codeMethod is required/);
    });

    it('throws when language is missing', async () => {
      await expect(manager.requestVerificationCode({ codeMethod: 'SMS', language: '' }))
        .rejects.toThrow(/language is required/);
    });
  });

  describe('verifyCode', () => {
    it('submits the verification code', async () => {
      await manager.verifyCode('123456');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('1234567890/verify_code', 'POST', { code: '123456' });
    });

    it('throws when code is missing', async () => {
      await expect(manager.verifyCode('')).rejects.toThrow(/code is required/);
    });
  });

  describe('register', () => {
    it('registers the phone number with a valid PIN', async () => {
      await manager.register('123456');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('1234567890/register', 'POST', {
        messaging_product: 'whatsapp',
        pin: '123456',
      });
    });

    it('rejects PINs that are not 6 digits', async () => {
      await expect(manager.register('123')).rejects.toThrow(/6-digit/);
      await expect(manager.register('abcdef')).rejects.toThrow(/6-digit/);
      expect(client.makeGraphRequest).not.toHaveBeenCalled();
    });
  });

  describe('deregister', () => {
    it('deregisters the phone number', async () => {
      await manager.deregister();

      expect(client.makeGraphRequest).toHaveBeenCalledWith('1234567890/deregister', 'POST');
    });
  });

  describe('setTwoStepVerificationPin', () => {
    it('sets the PIN', async () => {
      await manager.setTwoStepVerificationPin('654321');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('1234567890', 'POST', { pin: '654321' });
    });

    it('rejects invalid PINs', async () => {
      await expect(manager.setTwoStepVerificationPin('1')).rejects.toThrow(/6-digit/);
    });
  });

  describe('updateSettings', () => {
    it('sends the identity change check setting', async () => {
      await manager.updateSettings({ userIdentityChange: { enableIdentityKeyCheck: true } });

      expect(client.makeGraphRequest).toHaveBeenCalledWith('1234567890/settings', 'POST', {
        user_identity_change: { enable_identity_key_check: true },
      });
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeGraphRequest.mockRejectedValueOnce(new Error('API Error'));

      await expect(manager.deregister()).rejects.toThrow('API Error');
    });
  });
});
