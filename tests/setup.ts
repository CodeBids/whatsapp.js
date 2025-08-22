// Test setup file
import { jest } from '@jest/globals';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };

beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  Object.assign(console, originalConsole);
});

// Export common test utilities
export const createMockMessage = (id: string, overrides: any = {}) => ({
  id,
  timestamp: Date.now(),
  type: 'text',
  body: 'Test message',
  from: '1234567890',
  ...overrides
});

export const createMockClient = () => ({
  on: jest.fn(),
  emit: jest.fn(),
  getWebhookHandler: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn()
  }))
});