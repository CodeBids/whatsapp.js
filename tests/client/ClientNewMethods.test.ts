import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { EventEmitter } from 'events';

/**
 * Tests for new Client methods: typing indicator, media management,
 * business profile update.
 */

// Mock API service
const createMockApiService = () => ({
  request: jest.fn<() => Promise<any>>().mockResolvedValue({}),
  phoneRequest: jest.fn<() => Promise<any>>().mockResolvedValue({
    verified_name: 'Test Business',
    quality_rating: 'GREEN',
    id: '12345',
    display_phone_number: '+1234567890',
  }),
  getApiUrl: jest.fn<() => string>().mockReturnValue('https://graph.facebook.com/v25.0/12345'),
  uploadMedia: jest.fn<() => Promise<any>>().mockResolvedValue({ id: 'media_123' }),
  getMediaUrl: jest.fn<() => Promise<any>>().mockResolvedValue({
    messaging_product: 'whatsapp',
    url: 'https://lookaside.fbsbx.com/media/123',
    mime_type: 'image/jpeg',
    sha256: 'hash123',
    file_size: '5000',
    id: 'media_123',
  }),
  deleteMedia: jest.fn<() => Promise<any>>().mockResolvedValue({ success: true }),
  downloadMedia: jest.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
});

class MockClientWithNewMethods extends EventEmitter {
  private apiService: any;
  public name: string | null = null;
  public quality: string | null = null;
  public id: string | null = null;
  public displayPhoneNumber: string | null = null;

  constructor() {
    super();
    this.apiService = createMockApiService();
  }

  getApiService() {
    return this.apiService;
  }

  async makeApiRequest<T>(url: string, method: string, data?: any): Promise<T> {
    return this.apiService.request(url, method, data);
  }

  async sendTypingIndicator(to: string): Promise<any> {
    return this.makeApiRequest('messages', 'POST', {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      typing: 'typing',
    });
  }

  async updateBusinessProfile(profile: any): Promise<any> {
    return this.makeApiRequest('whatsapp_business_profile', 'POST', {
      messaging_product: 'whatsapp',
      ...profile,
    });
  }

  async uploadMedia(fileBuffer: Buffer, mimeType: string, filename: string): Promise<any> {
    return this.apiService.uploadMedia(fileBuffer, mimeType, filename);
  }

  async getMediaUrl(mediaId: string): Promise<any> {
    return this.apiService.getMediaUrl(mediaId);
  }

  async deleteMedia(mediaId: string): Promise<any> {
    return this.apiService.deleteMedia(mediaId);
  }

  async downloadMedia(mediaUrl: string): Promise<ArrayBuffer> {
    return this.apiService.downloadMedia(mediaUrl);
  }

  async downloadMediaById(mediaId: string): Promise<ArrayBuffer> {
    const mediaInfo = await this.getMediaUrl(mediaId);
    return this.downloadMedia(mediaInfo.url);
  }
}

describe('Client - New Methods', () => {
  let client: MockClientWithNewMethods;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new MockClientWithNewMethods();
  });

  describe('sendTypingIndicator', () => {
    it('should send typing indicator to a phone number', async () => {
      await client.sendTypingIndicator('5491155551234');

      const apiService = client.getApiService();
      expect(apiService.request).toHaveBeenCalledWith('messages', 'POST', {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: '5491155551234',
        typing: 'typing',
      });
    });

    it('should return the API response', async () => {
      const result = await client.sendTypingIndicator('5491155551234');
      expect(result).toBeDefined();
    });

    it('should propagate API errors', async () => {
      const apiService = client.getApiService();
      apiService.request.mockRejectedValueOnce(new Error('API Error'));

      await expect(client.sendTypingIndicator('5491155551234'))
        .rejects.toThrow('API Error');
    });
  });

  describe('updateBusinessProfile', () => {
    it('should update business profile with about', async () => {
      await client.updateBusinessProfile({ about: 'Test business description' });

      const apiService = client.getApiService();
      expect(apiService.request).toHaveBeenCalledWith('whatsapp_business_profile', 'POST', {
        messaging_product: 'whatsapp',
        about: 'Test business description',
      });
    });

    it('should update business profile with multiple fields', async () => {
      const profile = {
        about: 'Updated about',
        address: '123 Main St',
        description: 'A great business',
        email: 'test@example.com',
        websites: ['https://example.com'],
        vertical: 'RETAIL',
      };

      await client.updateBusinessProfile(profile);

      const apiService = client.getApiService();
      expect(apiService.request).toHaveBeenCalledWith('whatsapp_business_profile', 'POST', {
        messaging_product: 'whatsapp',
        ...profile,
      });
    });

    it('should update profile picture URL', async () => {
      await client.updateBusinessProfile({
        profile_picture_url: 'https://example.com/photo.jpg',
      });

      const apiService = client.getApiService();
      expect(apiService.request).toHaveBeenCalledWith('whatsapp_business_profile', 'POST', {
        messaging_product: 'whatsapp',
        profile_picture_url: 'https://example.com/photo.jpg',
      });
    });

    it('should propagate API errors', async () => {
      const apiService = client.getApiService();
      apiService.request.mockRejectedValueOnce(new Error('Unauthorized'));

      await expect(client.updateBusinessProfile({ about: 'test' }))
        .rejects.toThrow('Unauthorized');
    });
  });

  describe('uploadMedia', () => {
    it('should upload media with correct parameters', async () => {
      const buffer = Buffer.from('image-data');
      const result = await client.uploadMedia(buffer, 'image/jpeg', 'photo.jpg');

      expect(result).toEqual({ id: 'media_123' });

      const apiService = client.getApiService();
      expect(apiService.uploadMedia).toHaveBeenCalledWith(buffer, 'image/jpeg', 'photo.jpg');
    });

    it('should handle different MIME types', async () => {
      const buffer = Buffer.from('video-data');
      await client.uploadMedia(buffer, 'video/mp4', 'video.mp4');

      const apiService = client.getApiService();
      expect(apiService.uploadMedia).toHaveBeenCalledWith(buffer, 'video/mp4', 'video.mp4');
    });

    it('should handle document uploads', async () => {
      const buffer = Buffer.from('pdf-data');
      await client.uploadMedia(buffer, 'application/pdf', 'document.pdf');

      const apiService = client.getApiService();
      expect(apiService.uploadMedia).toHaveBeenCalledWith(buffer, 'application/pdf', 'document.pdf');
    });

    it('should propagate upload errors', async () => {
      const apiService = client.getApiService();
      apiService.uploadMedia.mockRejectedValueOnce(new Error('File too large'));

      const buffer = Buffer.from('big-data');
      await expect(client.uploadMedia(buffer, 'image/jpeg', 'big.jpg'))
        .rejects.toThrow('File too large');
    });
  });

  describe('getMediaUrl', () => {
    it('should get media URL by ID', async () => {
      const result = await client.getMediaUrl('media_123');

      expect(result.url).toBe('https://lookaside.fbsbx.com/media/123');
      expect(result.mime_type).toBe('image/jpeg');
      expect(result.id).toBe('media_123');
    });

    it('should propagate errors for invalid media IDs', async () => {
      const apiService = client.getApiService();
      apiService.getMediaUrl.mockRejectedValueOnce(new Error('Media not found'));

      await expect(client.getMediaUrl('invalid_id'))
        .rejects.toThrow('Media not found');
    });
  });

  describe('deleteMedia', () => {
    it('should delete media by ID', async () => {
      const result = await client.deleteMedia('media_123');

      expect(result).toEqual({ success: true });

      const apiService = client.getApiService();
      expect(apiService.deleteMedia).toHaveBeenCalledWith('media_123');
    });

    it('should propagate delete errors', async () => {
      const apiService = client.getApiService();
      apiService.deleteMedia.mockRejectedValueOnce(new Error('Not authorized'));

      await expect(client.deleteMedia('media_123'))
        .rejects.toThrow('Not authorized');
    });
  });

  describe('downloadMedia', () => {
    it('should download media from URL', async () => {
      const result = await client.downloadMedia('https://media.url/file.jpg');

      expect(result).toBeInstanceOf(ArrayBuffer);

      const apiService = client.getApiService();
      expect(apiService.downloadMedia).toHaveBeenCalledWith('https://media.url/file.jpg');
    });

    it('should propagate download errors', async () => {
      const apiService = client.getApiService();
      apiService.downloadMedia.mockRejectedValueOnce(new Error('Download failed'));

      await expect(client.downloadMedia('https://media.url/file.jpg'))
        .rejects.toThrow('Download failed');
    });
  });

  describe('downloadMediaById', () => {
    it('should get URL then download media', async () => {
      const result = await client.downloadMediaById('media_123');

      expect(result).toBeInstanceOf(ArrayBuffer);

      const apiService = client.getApiService();
      expect(apiService.getMediaUrl).toHaveBeenCalledWith('media_123');
      expect(apiService.downloadMedia).toHaveBeenCalledWith('https://lookaside.fbsbx.com/media/123');
    });

    it('should propagate getMediaUrl errors', async () => {
      const apiService = client.getApiService();
      apiService.getMediaUrl.mockRejectedValueOnce(new Error('Media expired'));

      await expect(client.downloadMediaById('expired_media'))
        .rejects.toThrow('Media expired');
    });

    it('should propagate downloadMedia errors', async () => {
      const apiService = client.getApiService();
      apiService.downloadMedia.mockRejectedValueOnce(new Error('Download timeout'));

      await expect(client.downloadMediaById('media_123'))
        .rejects.toThrow('Download timeout');
    });
  });

  describe('Integration scenarios', () => {
    it('should upload then send media as message', async () => {
      const buffer = Buffer.from('image-bytes');
      const uploadResult = await client.uploadMedia(buffer, 'image/jpeg', 'promo.jpg');

      expect(uploadResult.id).toBe('media_123');
      // The media ID can then be used in message.send with files: [{ type: 'image', id: uploadResult.id }]
    });

    it('should get URL then download incoming media', async () => {
      const mediaInfo = await client.getMediaUrl('incoming_media_456');
      expect(mediaInfo.url).toBeDefined();

      const data = await client.downloadMedia(mediaInfo.url);
      expect(data).toBeInstanceOf(ArrayBuffer);
    });

    it('should upload media then delete it', async () => {
      const buffer = Buffer.from('temp-data');
      const uploadResult = await client.uploadMedia(buffer, 'image/png', 'temp.png');

      const deleteResult = await client.deleteMedia(uploadResult.id);
      expect(deleteResult.success).toBe(true);
    });
  });
});
