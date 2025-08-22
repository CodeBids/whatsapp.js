// Mock utilities for WhatsApp.js testing
import { jest } from '@jest/globals';

/**
 * Creates a mock WhatsApp message object
 */
export const createMockWhatsAppMessage = (overrides: any = {}) => ({
  id: 'msg_123456789',
  timestamp: '1234567890',
  type: 'text',
  from: '1234567890',
  text: {
    body: 'Hello World'
  },
  ...overrides
});

/**
 * Creates a mock interactive message
 */
export const createMockInteractiveMessage = (interactiveType: 'button' | 'list' = 'button') => ({
  id: 'interactive_123',
  timestamp: '1234567890',
  type: 'interactive',
  from: '1234567890',
  interactive: {
    type: interactiveType,
    ...(interactiveType === 'button' ? {
      button_reply: {
        id: 'btn_1',
        title: 'Button Title'
      }
    } : {
      list_reply: {
        id: 'list_1',
        title: 'List Item',
        description: 'List Description'
      }
    })
  }
});

/**
 * Creates a mock webhook handler
 */
export const createMockWebhookHandler = () => ({
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
  removeListener: jest.fn(),
  registerCollector: jest.fn(),
  unregisterCollector: jest.fn(),
  handle: jest.fn(),
  verifyWebhook: jest.fn(() => true)
});

/**
 * Creates a mock WhatsApp API service
 */
export const createMockApiService = () => ({
  sendMessage: jest.fn().mockResolvedValue({
    messaging_product: 'whatsapp',
    contacts: [{ input: '1234567890', wa_id: '1234567890' }],
    messages: [{ id: 'msg_123', status: 'sent' }]
  }),
  getBusinessProfile: jest.fn().mockResolvedValue({
    name: 'Test Business',
    quality: 'high',
    id: '12345',
    display_phone_number: '+1234567890'
  }),
  uploadMedia: jest.fn().mockResolvedValue({
    id: 'media_123'
  }),
  getMedia: jest.fn().mockResolvedValue({
    url: 'https://example.com/media.jpg',
    mime_type: 'image/jpeg',
    sha256: 'abc123',
    file_size: '12345'
  })
});

/**
 * Creates a mock template component
 */
export const createMockTemplateComponent = (type: 'header' | 'body' | 'button' | 'footer' = 'body') => ({
  type,
  parameters: [
    {
      type: 'text',
      text: 'Sample text'
    }
  ]
});

/**
 * Creates a mock interactive data structure
 */
export const createMockInteractiveData = (type: 'button' | 'list' = 'button') => ({
  type,
  header: {
    type: 'text',
    text: 'Header Text'
  },
  body: {
    text: 'Body Text'
  },
  footer: {
    text: 'Footer Text'
  },
  action: type === 'button' ? {
    buttons: [
      {
        type: 'reply',
        reply: {
          id: 'btn_1',
          title: 'Button 1'
        }
      }
    ]
  } : {
    button: 'Select an option',
    sections: [
      {
        title: 'Section 1',
        rows: [
          {
            id: 'row_1',
            title: 'Row 1',
            description: 'Description 1'
          }
        ]
      }
    ]
  }
});

/**
 * Creates a mock contact data
 */
export const createMockContactData = () => ({
  firstName: 'John',
  lastName: 'Doe',
  phones: [{
    number: 1234567890,
    type: 'CELL' as const,
    wa_id: 1234567890
  }],
  emails: [{
    address: 'john.doe@example.com',
    type: 'personal' as const
  }],
  addresses: [{
    street: { name: 'Main St', number: 123 },
    type: 'home' as const,
    city: 'New York',
    zipCode: '10001',
    country: { name: 'USA', code: 'US' }
  }]
});

/**
 * Creates a mock media attachment
 */
export const createMockMediaAttachment = (type: 'image' | 'video' | 'audio' | 'document' = 'image') => ({
  type,
  id: `${type}_123456`,
  caption: type !== 'audio' ? 'Media caption' : undefined,
  filename: type === 'document' ? 'document.pdf' : undefined
});

/**
 * Creates a mock error response
 */
export const createMockErrorResponse = (code = 0, message = 'Test error') => ({
  error: {
    message,
    code,
    error_data: {
      messaging_product: 'whatsapp',
      details: message
    }
  }
});

/**
 * Creates a mock location data
 */
export const createMockLocationData = () => ({
  latitude: 40.7128,
  longitude: -74.0060,
  name: 'New York City',
  address: 'New York, NY, USA'
});

/**
 * Mock validation functions
 */
export const mockValidators = {
  isValidUrl: jest.fn((url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }),
  
  isValidEmail: jest.fn((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }),
  
  isValidPhoneNumber: jest.fn((phone: string) => {
    return /^\+?[\d\s\-\(\)]+$/.test(phone);
  })
};

/**
 * Mock event types for webhook handling
 */
export const MockEventTypes = {
  MESSAGE_RECEIVED: 'message_received',
  MESSAGE_STATUS_UPDATE: 'message_status_update',
  INTERACTION_CREATE: 'interaction_create',
  MEDIA_RECEIVED: 'media_received'
};

/**
 * Utility to wait for async operations in tests
 */
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Utility to create a promise that resolves after a specified time
 */
export const delayedResolve = <T>(value: T, delay: number = 100): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(value), delay));

/**
 * Utility to create a promise that rejects after a specified time
 */
export const delayedReject = (error: Error, delay: number = 100): Promise<never> => 
  new Promise((_, reject) => setTimeout(() => reject(error), delay));