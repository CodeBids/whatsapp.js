import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { QrCodeManager } from '../../src/client/actions/QrCodes';

/**
 * Tests for QrCodeManager (QR codes / short links API).
 */

function createMockClient() {
  return {
    makeApiRequest: jest
      .fn<(endpoint: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
  };
}

describe('QrCodeManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: QrCodeManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new QrCodeManager(client as any);
  });

  describe('create', () => {
    it('creates a QR code with a prefilled message', async () => {
      client.makeApiRequest.mockResolvedValueOnce({
        code: 'ABC123',
        prefilled_message: 'Hi!',
        deep_link_url: 'https://wa.me/message/ABC123',
      });

      const result = await manager.create({ prefilledMessage: 'Hi!' });

      expect(result.code).toBe('ABC123');
      expect(client.makeApiRequest).toHaveBeenCalledWith('message_qrdls', 'POST', {
        prefilled_message: 'Hi!',
      });
    });

    it('includes generateQrImage when provided', async () => {
      await manager.create({ prefilledMessage: 'Hi!', generateQrImage: 'PNG' });

      expect(client.makeApiRequest).toHaveBeenCalledWith('message_qrdls', 'POST', {
        prefilled_message: 'Hi!',
        generate_qr_image: 'PNG',
      });
    });

    it('rejects an empty prefilled message', async () => {
      await expect(manager.create({ prefilledMessage: '' })).rejects.toThrow(/prefilledMessage is required/);
    });

    it('rejects a prefilled message over 140 characters', async () => {
      await expect(manager.create({ prefilledMessage: 'a'.repeat(141) }))
        .rejects.toThrow(/140 characters or less/);
    });
  });

  describe('list', () => {
    it('lists every QR code', async () => {
      client.makeApiRequest.mockResolvedValueOnce({ data: [] });

      await manager.list();

      expect(client.makeApiRequest).toHaveBeenCalledWith('message_qrdls', 'GET');
    });
  });

  describe('get', () => {
    it('gets a QR code by ID', async () => {
      await manager.get('ABC123');

      expect(client.makeApiRequest).toHaveBeenCalledWith('message_qrdls/ABC123', 'GET');
    });

    it('throws when codeId is missing', async () => {
      await expect(manager.get('')).rejects.toThrow(/codeId is required/);
    });
  });

  describe('update', () => {
    it('updates the prefilled message', async () => {
      await manager.update('ABC123', 'New message');

      expect(client.makeApiRequest).toHaveBeenCalledWith('message_qrdls', 'POST', {
        code: 'ABC123',
        prefilled_message: 'New message',
      });
    });

    it('throws when codeId is missing', async () => {
      await expect(manager.update('', 'msg')).rejects.toThrow(/codeId is required/);
    });

    it('rejects an invalid prefilled message', async () => {
      await expect(manager.update('ABC123', '')).rejects.toThrow(/prefilledMessage is required/);
    });
  });

  describe('delete', () => {
    it('deletes a QR code', async () => {
      await manager.delete('ABC123');

      expect(client.makeApiRequest).toHaveBeenCalledWith('message_qrdls/ABC123', 'DELETE');
    });

    it('throws when codeId is missing', async () => {
      await expect(manager.delete('')).rejects.toThrow(/codeId is required/);
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeApiRequest.mockRejectedValueOnce(new Error('API Error'));

      await expect(manager.list()).rejects.toThrow('API Error');
    });
  });
});
