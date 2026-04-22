import { describe, it, expect, jest, beforeEach } from '@jest/globals';

/**
 * Tests for WhatsAppApiService media management methods.
 */

// Mock global fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
(global as any).fetch = mockFetch;

// We need to import after mocking fetch
import { WhatsAppApiService } from '../../src/services/wa-api-cloud.service';
import { WhatsAppApiException } from '../../src/errors/Messages';

describe('WhatsAppApiService - Media Management', () => {
  let service: WhatsAppApiService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new WhatsAppApiService('test-token', 'v25.0', '1234567890');
  });

  describe('uploadMedia', () => {
    it('should upload media successfully', async () => {
      const mockResponse = { id: 'media_12345' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const buffer = Buffer.from('fake-image-data');
      const result = await service.uploadMedia(buffer, 'image/jpeg', 'photo.jpg');

      expect(result).toEqual({ id: 'media_12345' });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('https://graph.facebook.com/v25.0/1234567890/media');
      expect(options?.method).toBe('POST');
      expect(options?.headers).toHaveProperty('Authorization', 'Bearer test-token');
    });

    it('should throw WhatsAppApiException on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({
          error: {
            message: 'Upload failed',
            code: 100,
            error_data: { details: 'Invalid file type' },
          },
        }),
      } as Response);

      const buffer = Buffer.from('bad-data');
      await expect(service.uploadMedia(buffer, 'invalid/type', 'bad.xyz'))
        .rejects.toThrow(WhatsAppApiException);
    });

    it('should wrap network errors in WhatsAppApiException', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const buffer = Buffer.from('data');
      await expect(service.uploadMedia(buffer, 'image/jpeg', 'test.jpg'))
        .rejects.toThrow(WhatsAppApiException);
    });

    it('should handle non-Error rejections', async () => {
      mockFetch.mockRejectedValueOnce('string error');

      const buffer = Buffer.from('data');
      await expect(service.uploadMedia(buffer, 'image/jpeg', 'test.jpg'))
        .rejects.toThrow('Unknown error uploading media');
    });
  });

  describe('getMediaUrl', () => {
    it('should get media URL successfully', async () => {
      const mockResponse = {
        messaging_product: 'whatsapp',
        url: 'https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=media_123',
        mime_type: 'image/jpeg',
        sha256: 'abc123hash',
        file_size: '12345',
        id: 'media_123',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await service.getMediaUrl('media_123');

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://graph.facebook.com/v25.0/media_123',
        expect.objectContaining({
          method: 'GET',
          headers: { Authorization: 'Bearer test-token' },
        }),
      );
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({
          error: { message: 'Media not found', code: 100, error_data: { details: 'Not found' } },
        }),
      } as Response);

      await expect(service.getMediaUrl('invalid_id'))
        .rejects.toThrow(WhatsAppApiException);
    });

    it('should wrap network errors in WhatsAppApiException', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(service.getMediaUrl('media_123'))
        .rejects.toThrow(WhatsAppApiException);
    });
  });

  describe('deleteMedia', () => {
    it('should delete media successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      const result = await service.deleteMedia('media_123');

      expect(result).toEqual({ success: true });
      expect(mockFetch).toHaveBeenCalledWith(
        'https://graph.facebook.com/v25.0/media_123',
        expect.objectContaining({ method: 'DELETE' }),
      );
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({
          error: { message: 'Delete failed', code: 100, error_data: { details: 'Forbidden' } },
        }),
      } as Response);

      await expect(service.deleteMedia('media_123'))
        .rejects.toThrow(WhatsAppApiException);
    });

    it('should wrap network errors in WhatsAppApiException', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network unavailable'));

      await expect(service.deleteMedia('media_123'))
        .rejects.toThrow(WhatsAppApiException);
    });
  });

  describe('downloadMedia', () => {
    it('should download media successfully', async () => {
      const fakeArrayBuffer = new ArrayBuffer(8);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(fakeArrayBuffer),
      } as Response);

      const result = await service.downloadMedia('https://media.url/file.jpg');

      expect(result).toBe(fakeArrayBuffer);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://media.url/file.jpg',
        expect.objectContaining({
          method: 'GET',
          headers: { Authorization: 'Bearer test-token' },
        }),
      );
    });

    it('should throw WhatsAppApiException on HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(service.downloadMedia('https://media.url/missing.jpg'))
        .rejects.toThrow(WhatsAppApiException);
    });

    it('should include status code in error message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      try {
        await service.downloadMedia('https://media.url/missing.jpg');
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error).toBeInstanceOf(WhatsAppApiException);
        expect((error as WhatsAppApiException).message).toContain('404');
      }
    });

    it('should wrap network errors in WhatsAppApiException', async () => {
      mockFetch.mockRejectedValueOnce(new Error('DNS resolution failed'));

      await expect(service.downloadMedia('https://media.url/file.jpg'))
        .rejects.toThrow(WhatsAppApiException);
    });
  });
});
