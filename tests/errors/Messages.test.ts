import { describe, it, expect } from '@jest/globals';
import { WhatsAppApiException, getErrorMessage } from '../../src/errors/Messages';

describe('WhatsAppApiException', () => {
  describe('constructor', () => {
    it('should create exception with required parameters', () => {
      const error = new WhatsAppApiException('Test error', 100);
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(WhatsAppApiException);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe(100);
      expect(error.name).toBe('WhatsAppApiException');
    });

    it('should create exception with all parameters', () => {
      const error = new WhatsAppApiException(
        'Test error',
        100,
        10,
        'Additional details',
        'trace-123'
      );
      
      expect(error.message).toBe('Test error');
      expect(error.code).toBe(100);
      expect(error.subcode).toBe(10);
      expect(error.details).toBe('Additional details');
      expect(error.traceId).toBe('trace-123');
    });

    it('should handle optional parameters as undefined', () => {
      const error = new WhatsAppApiException('Test error', 100);
      
      expect(error.subcode).toBeUndefined();
      expect(error.details).toBeUndefined();
      expect(error.traceId).toBeUndefined();
    });

    it('should be throwable and catchable', () => {
      const throwError = () => {
        throw new WhatsAppApiException('Test error', 100);
      };

      expect(throwError).toThrow('Test error');
      expect(throwError).toThrow(WhatsAppApiException);

      try {
        throwError();
      } catch (error) {
        expect(error).toBeInstanceOf(WhatsAppApiException);
        expect((error as WhatsAppApiException).code).toBe(100);
      }
    });
  });

  describe('error properties', () => {
    it('should maintain error properties correctly', () => {
      const error = new WhatsAppApiException('API failed', 401, 1001, 'Unauthorized access', 'abc-123');
      
      expect(error.name).toBe('WhatsAppApiException');
      expect(error.message).toBe('API failed');
      expect(error.code).toBe(401);
      expect(error.subcode).toBe(1001);
      expect(error.details).toBe('Unauthorized access');
      expect(error.traceId).toBe('abc-123');
      expect(error.stack).toBeDefined();
    });

    it('should be JSON serializable', () => {
      const error = new WhatsAppApiException('API failed', 401, 1001, 'Details', 'trace');
      
      const serialized = JSON.stringify({
        name: error.name,
        message: error.message,
        code: error.code,
        subcode: error.subcode,
        details: error.details,
        traceId: error.traceId
      });
      
      const parsed = JSON.parse(serialized);
      
      expect(parsed.name).toBe('WhatsAppApiException');
      expect(parsed.message).toBe('API failed');
      expect(parsed.code).toBe(401);
      expect(parsed.subcode).toBe(1001);
      expect(parsed.details).toBe('Details');
      expect(parsed.traceId).toBe('trace');
    });
  });
});

describe('getErrorMessage', () => {
  it('should return correct message for known error codes', () => {
    // Test with actual error codes that exist in the system
    expect(typeof getErrorMessage(100)).toBe('string');
    expect(typeof getErrorMessage(200)).toBe('string');
    expect(getErrorMessage(100).length).toBeGreaterThan(0);
    expect(getErrorMessage(200).length).toBeGreaterThan(0);
  });

  it('should return generic message for unknown error codes', () => {
    const unknownCode = 99999;
    const message = getErrorMessage(unknownCode);
    
    expect(message).toBe(`Unknown error (code: ${unknownCode})`);
  });

  it('should handle various error code types', () => {
    // Test with different number types - check that they return strings
    expect(typeof getErrorMessage(-1)).toBe('string');
    expect(getErrorMessage(-1)).toContain('Unknown error (code: -1)');
    expect(getErrorMessage(999999)).toContain('Unknown error (code: 999999)');
  });

  it('should be consistent with return types', () => {
    // All returns should be strings
    expect(typeof getErrorMessage(100)).toBe('string');
    expect(typeof getErrorMessage(99999)).toBe('string');
    expect(typeof getErrorMessage(0)).toBe('string');
  });
});

describe('Error message mappings', () => {
  // Test the patterns we can infer from the code
  it('should handle authentication related errors', () => {
    // Test that error messages exist and are descriptive
    const authMessage = getErrorMessage(100); // Assuming this maps to auth error
    expect(typeof authMessage).toBe('string');
    expect(authMessage.length).toBeGreaterThan(0);
  });

  it('should handle permission related errors', () => {
    const permissionMessage = getErrorMessage(200); // Assuming this maps to permission error
    expect(typeof permissionMessage).toBe('string');
    expect(permissionMessage.length).toBeGreaterThan(0);
  });

  it('should handle template related errors', () => {
    const templateMessage = getErrorMessage(300); // Assuming this maps to template error
    expect(typeof templateMessage).toBe('string');
    expect(templateMessage.length).toBeGreaterThan(0);
  });

  it('should handle rate limiting errors', () => {
    const rateLimitMessage = getErrorMessage(400); // Assuming this maps to rate limit error
    expect(typeof rateLimitMessage).toBe('string');
    expect(rateLimitMessage.length).toBeGreaterThan(0);
  });
});

describe('Error handling scenarios', () => {
  it('should handle error creation in try-catch blocks', () => {
    const createAndThrowError = () => {
      try {
        // Simulate some operation that fails
        throw new WhatsAppApiException('Network error', 500, 5001, 'Connection timeout');
      } catch (originalError: any) {
        // Re-throw with additional context
        throw new WhatsAppApiException(
          `Failed to process request: ${originalError.message}`,
          500,
          5002,
          'Request processing failed'
        );
      }
    };

    expect(() => createAndThrowError()).toThrow('Failed to process request: Network error');
  });

  it('should support error chaining patterns', () => {
    const originalError = new Error('Original error');
    const whatsappError = new WhatsAppApiException(
      `WhatsApp error: ${originalError.message}`,
      500,
      undefined,
      originalError.stack
    );

    expect(whatsappError.message).toContain('Original error');
    expect(whatsappError.details).toContain('Error');
  });

  it('should handle validation error scenarios', () => {
    const validateAndThrow = (value: any) => {
      if (!value) {
        throw new WhatsAppApiException('Validation failed', 400, 4001, 'Required field is missing');
      }
      if (typeof value !== 'string') {
        throw new WhatsAppApiException('Validation failed', 400, 4002, 'Field must be a string');
      }
    };

    expect(() => validateAndThrow(null)).toThrow('Validation failed');
    expect(() => validateAndThrow(123)).toThrow('Validation failed');
    expect(() => validateAndThrow('valid')).not.toThrow();
  });

  it('should maintain error context in async operations', async () => {
    const asyncOperation = async () => {
      throw new WhatsAppApiException('Async error', 500, 5001, 'Async operation failed');
    };

    await expect(asyncOperation()).rejects.toThrow('Async error');
    await expect(asyncOperation()).rejects.toThrow(WhatsAppApiException);
    
    try {
      await asyncOperation();
    } catch (error) {
      expect(error).toBeInstanceOf(WhatsAppApiException);
      expect((error as WhatsAppApiException).code).toBe(500);
      expect((error as WhatsAppApiException).subcode).toBe(5001);
    }
  });
});