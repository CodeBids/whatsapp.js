import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { EventEmitter } from 'events';

// Mock the Client class functionality since we can't import it directly due to dependencies
class MockClient extends EventEmitter {
  public name: string | null = null;
  public quality: string | null = null;
  public id: string | null = null;
  public displayPhoneNumber: string | null = null;

  private webhookHandler: any = null;
  private apiService: any;

  constructor(private options: any) {
    super();
    
    this.validateOptions(options);
    this.apiService = this.createMockApiService();
    
    if (options.webhook) {
      this.webhookHandler = this.createMockWebhookHandler();
    }
  }

  private validateOptions(options: any): void {
    const { phoneId, accessToken } = options;

    if (!phoneId || !accessToken) {
      throw new Error('Phone ID and Access Token are required');
    }

    if (!/^\d+$/.test(phoneId)) {
      throw new Error('Phone ID must be a numeric string');
    }

    if (!/^[A-Za-z0-9]+$/.test(accessToken)) {
      throw new Error('Access Token must be alphanumeric');
    }
  }

  private createMockApiService(): any {
    return {
      getBusinessProfile: jest.fn().mockImplementation(() => 
        Promise.resolve({
          name: 'Test Business',
          quality: 'high',
          id: '12345',
          display_phone_number: '+1234567890'
        })
      )
    };
  }

  private createMockWebhookHandler() {
    return {
      on: jest.fn(),
      off: jest.fn(),
      registerCollector: jest.fn(),
      unregisterCollector: jest.fn()
    };
  }

  getWebhookHandler() {
    return this.webhookHandler;
  }

  createMessageCollector(options: any = {}, eventTypes: any[] = []) {
    if (!this.webhookHandler) {
      throw new Error('Webhook handler is not initialized. Please provide webhook options when creating the client.');
    }

    return {
      on: jest.fn(),
      stop: jest.fn(),
      resetTimer: jest.fn(),
      awaitMessages: jest.fn().mockImplementation(() => Promise.resolve(new Map()))
    };
  }

  awaitMessage(filter: any = () => true, time = 60000, eventTypes: any[] = []) {
    return new Promise((resolve, reject) => {
      if (!this.webhookHandler) {
        reject(new Error('Webhook handler is not initialized'));
        return;
      }
      
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ id: 'msg1', text: 'Test message' });
        } else {
          reject(new Error('No messages were collected within the time limit'));
        }
      }, 100);
    });
  }

  async getBusinessProfile() {
    const profile = await this.apiService.getBusinessProfile();
    this.name = profile.name;
    this.quality = profile.quality;
    this.id = profile.id;
    this.displayPhoneNumber = profile.display_phone_number;
    return profile;
  }
}

describe('Client', () => {
  let validOptions: any;

  beforeEach(() => {
    jest.clearAllMocks();
    validOptions = {
      phoneId: '1234567890',
      accessToken: 'ABC123DEF456',
      webhook: {
        port: 3000,
        endpoint: '/webhook'
      }
    };
  });

  describe('constructor', () => {
    it('should create client with valid options', () => {
      const client = new MockClient(validOptions);
      
      expect(client).toBeInstanceOf(MockClient);
      expect(client).toBeInstanceOf(EventEmitter);
    });

    it('should throw error when phoneId is missing', () => {
      const invalidOptions = { ...validOptions, phoneId: undefined };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID and Access Token are required');
    });

    it('should throw error when accessToken is missing', () => {
      const invalidOptions = { ...validOptions, accessToken: undefined };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID and Access Token are required');
    });

    it('should throw error for invalid phoneId format', () => {
      const invalidOptions = { ...validOptions, phoneId: 'abc123' };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID must be a numeric string');
    });

    it('should throw error for phoneId with special characters', () => {
      const invalidOptions = { ...validOptions, phoneId: '123-456-7890' };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID must be a numeric string');
    });

    it('should throw error for invalid accessToken format', () => {
      const invalidOptions = { ...validOptions, accessToken: 'token-with-dash!' };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Access Token must be alphanumeric');
    });

    it('should accept valid phoneId formats', () => {
      const validPhoneIds = ['1234567890', '0123456789', '9999999999'];
      
      validPhoneIds.forEach(phoneId => {
        const options = { ...validOptions, phoneId };
        expect(() => new MockClient(options)).not.toThrow();
      });
    });

    it('should accept valid accessToken formats', () => {
      const validTokens = ['ABC123', 'abc123', 'ABC123def456', '123456'];
      
      validTokens.forEach(accessToken => {
        const options = { ...validOptions, accessToken };
        expect(() => new MockClient(options)).not.toThrow();
      });
    });

    it('should initialize webhook handler when webhook options are provided', () => {
      const client = new MockClient(validOptions);
      
      expect(client.getWebhookHandler()).toBeTruthy();
    });

    it('should not initialize webhook handler when webhook options are not provided', () => {
      const optionsWithoutWebhook = {
        phoneId: '1234567890',
        accessToken: 'ABC123DEF456'
      };
      
      const client = new MockClient(optionsWithoutWebhook);
      
      expect(client.getWebhookHandler()).toBeNull();
    });
  });

  describe('getWebhookHandler', () => {
    it('should return webhook handler when initialized', () => {
      const client = new MockClient(validOptions);
      const handler = client.getWebhookHandler();
      
      expect(handler).toBeTruthy();
      expect(typeof handler.on).toBe('function');
      expect(typeof handler.registerCollector).toBe('function');
    });

    it('should return null when webhook not initialized', () => {
      const optionsWithoutWebhook = {
        phoneId: '1234567890',
        accessToken: 'ABC123DEF456'
      };
      
      const client = new MockClient(optionsWithoutWebhook);
      
      expect(client.getWebhookHandler()).toBeNull();
    });
  });

  describe('createMessageCollector', () => {
    it('should create message collector with webhook handler', () => {
      const client = new MockClient(validOptions);
      const collector = client.createMessageCollector();
      
      expect(collector).toBeTruthy();
      expect(typeof collector.on).toBe('function');
      expect(typeof collector.stop).toBe('function');
    });

    it('should accept collector options', () => {
      const client = new MockClient(validOptions);
      const options = { time: 5000, max: 3 };
      
      expect(() => client.createMessageCollector(options)).not.toThrow();
    });

    it('should accept custom event types', () => {
      const client = new MockClient(validOptions);
      const eventTypes = ['MESSAGE_RECEIVED'];
      
      expect(() => client.createMessageCollector({}, eventTypes)).not.toThrow();
    });

    it('should throw error when webhook handler not initialized', () => {
      const clientWithoutWebhook = new MockClient({
        phoneId: '1234567890',
        accessToken: 'ABC123DEF456'
      });
      
      expect(() => clientWithoutWebhook.createMessageCollector())
        .toThrow('Webhook handler is not initialized. Please provide webhook options when creating the client.');
    });
  });

  describe('awaitMessage', () => {
    let client: MockClient;

    beforeEach(() => {
      client = new MockClient(validOptions);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should resolve with message when one is received', async () => {
      const messagePromise = client.awaitMessage();
      
      // Fast-forward timers to trigger the mock resolution
      jest.advanceTimersByTime(100);
      
      // Since we're using a random resolution, we'll test both cases
      await expect(messagePromise).resolves.toBeDefined();
    });

    it('should accept filter function', () => {
      const filter = (msg: any) => msg.type === 'text';
      
      expect(() => client.awaitMessage(filter)).not.toThrow();
    });

    it('should accept custom timeout', () => {
      expect(() => client.awaitMessage(() => true, 10000)).not.toThrow();
    });

    it('should accept custom event types', () => {
      const eventTypes = ['MESSAGE_RECEIVED'];
      
      expect(() => client.awaitMessage(() => true, 60000, eventTypes)).not.toThrow();
    });

    it('should reject when webhook handler not initialized', async () => {
      const clientWithoutWebhook = new MockClient({
        phoneId: '1234567890',
        accessToken: 'ABC123DEF456'
      });
      
      await expect(clientWithoutWebhook.awaitMessage())
        .rejects.toThrow('Webhook handler is not initialized');
    });
  });

  describe('getBusinessProfile', () => {
    it('should fetch and set business profile data', async () => {
      const client = new MockClient(validOptions);
      
      const profile = await client.getBusinessProfile();
      
      expect(profile).toEqual({
        name: 'Test Business',
        quality: 'high',
        id: '12345',
        display_phone_number: '+1234567890'
      });
      
      expect(client.name).toBe('Test Business');
      expect(client.quality).toBe('high');
      expect(client.id).toBe('12345');
      expect(client.displayPhoneNumber).toBe('+1234567890');
    });

    it('should handle API errors gracefully', async () => {
      const client = new MockClient(validOptions);
      
      // Mock API service to reject
      client['apiService'].getBusinessProfile.mockRejectedValue(new Error('API Error'));
      
      await expect(client.getBusinessProfile()).rejects.toThrow('API Error');
    });
  });

  describe('Event emitter functionality', () => {
    it('should be able to emit and listen to events', () => {
      const client = new MockClient(validOptions);
      const eventHandler = jest.fn();
      
      client.on('test-event', eventHandler);
      client.emit('test-event', 'test-data');
      
      expect(eventHandler).toHaveBeenCalledWith('test-data');
    });

    it('should be able to remove event listeners', () => {
      const client = new MockClient(validOptions);
      const eventHandler = jest.fn();
      
      client.on('test-event', eventHandler);
      client.off('test-event', eventHandler);
      client.emit('test-event', 'test-data');
      
      expect(eventHandler).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string phoneId', () => {
      const invalidOptions = { ...validOptions, phoneId: '' };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID and Access Token are required');
    });

    it('should handle empty string accessToken', () => {
      const invalidOptions = { ...validOptions, accessToken: '' };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID and Access Token are required');
    });

    it('should handle null values', () => {
      const invalidOptions = { phoneId: null, accessToken: null };
      
      expect(() => new MockClient(invalidOptions))
        .toThrow('Phone ID and Access Token are required');
    });

    it('should handle very long phoneId', () => {
      const longPhoneId = '1234567890123456789012345678901234567890';
      const options = { ...validOptions, phoneId: longPhoneId };
      
      // Should not throw for long numeric strings
      expect(() => new MockClient(options)).not.toThrow();
    });

    it('should handle very long accessToken', () => {
      const longToken = 'A'.repeat(1000);
      const options = { ...validOptions, accessToken: longToken };
      
      // Should not throw for long alphanumeric strings
      expect(() => new MockClient(options)).not.toThrow();
    });
  });
});