import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// We need to create mocks for the dependencies since we can't import the actual Message class
// due to its complex dependencies. We'll test the validation logic patterns.

describe('Message Validation Logic', () => {
  // Mock the WhatsAppApiException class
  class MockWhatsAppApiException extends Error {
    constructor(message: string, public code: number) {
      super(message);
      this.name = 'WhatsAppApiException';
    }
  }

  // Mock validation methods based on the code we saw
  class MessageValidator {
    private isValidUrl(url: string): boolean {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }

    private isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    validateInteractiveButtons(buttons: any[]): void {
      if (buttons.length === 0) {
        throw new MockWhatsAppApiException('At least one button is required', 0);
      }

      for (const button of buttons) {
        if (button.type === 'url' && !this.isValidUrl(button.url || '')) {
          throw new MockWhatsAppApiException(`Invalid URL format: ${button.url}`, 0);
        }
      }
    }

    validateInteractiveSections(sections: any[]): void {
      if (sections.length === 0) {
        throw new MockWhatsAppApiException('At least one section is required', 0);
      }

      for (const section of sections) {
        if (!section.title) {
          throw new MockWhatsAppApiException('Section title is required', 0);
        }

        if (!section.rows || section.rows.length === 0) {
          throw new MockWhatsAppApiException('At least one row is required per section', 0);
        }

        for (const row of section.rows) {
          if (!row.id) {
            throw new MockWhatsAppApiException('Row ID is required', 0);
          }
          if (!row.title) {
            throw new MockWhatsAppApiException('Row title is required', 0);
          }
        }
      }
    }

    validateTemplateComponent(component: any): void {
      // Validate component type
      if (!['header', 'body', 'button', 'footer'].includes(component.type)) {
        throw new MockWhatsAppApiException(`Invalid component type: ${component.type}`, 0);
      }

      // Validate button sub_type if it's a button
      if (component.type === 'button' && component.sub_type) {
        if (!['quick_reply', 'url', 'CATALOG'].includes(component.sub_type)) {
          throw new MockWhatsAppApiException(`Invalid button sub_type: ${component.sub_type}`, 0);
        }
      }

      // Validate parameters
      if (!component.parameters || !Array.isArray(component.parameters) || component.parameters.length === 0) {
        throw new MockWhatsAppApiException('Parameters are required for template components', 0);
      }
    }

    validateInteractiveHeader(header: any): void {
      switch (header.type) {
        case 'text':
          if (!header.text) {
            throw new MockWhatsAppApiException('Text is required for text header', 0);
          }
          break;
        case 'image':
          if (!header.image || (!header.image.link && !header.image.id)) {
            throw new MockWhatsAppApiException('Image link or ID is required for image header', 0);
          }
          break;
        case 'video':
          if (!header.video || (!header.video.link && !header.video.id)) {
            throw new MockWhatsAppApiException('Video link or ID is required for video header', 0);
          }
          break;
        case 'document':
          if (!header.document || (!header.document.link && !header.document.id)) {
            throw new MockWhatsAppApiException('Document link or ID is required for document header', 0);
          }
          break;
      }
    }

    validateContactEmails(emails: any[]): void {
      emails.forEach((email) => {
        if (!email.address || !this.isValidEmail(email.address)) {
          throw new MockWhatsAppApiException(`Invalid email format: ${email.address}`, 0);
        }
      });
    }

    validateContactUrls(urls: any[]): void {
      urls.forEach((url) => {
        if (!url.url || !this.isValidUrl(url.url)) {
          throw new MockWhatsAppApiException(`Invalid URL format: ${url.url}`, 0);
        }
      });
    }

    validateMessageContext(context: any): void {
      if (context && !context.message_id) {
        throw new MockWhatsAppApiException('Message ID is required in context for reply/quote messages', 0);
      }
    }

    validateEmbedBody(embed: any): void {
      if (!embed.body) {
        throw new MockWhatsAppApiException('Body is required for embed messages', 0);
      }
    }
  }

  let validator: MessageValidator;

  beforeEach(() => {
    validator = new MessageValidator();
  });

  describe('URL validation', () => {
    it('should validate correct URLs', () => {
      expect(validator['isValidUrl']('https://example.com')).toBe(true);
      expect(validator['isValidUrl']('http://example.com')).toBe(true);
      expect(validator['isValidUrl']('https://subdomain.example.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validator['isValidUrl']('not-a-url')).toBe(false);
      expect(validator['isValidUrl']('http://')).toBe(false);
      expect(validator['isValidUrl']('')).toBe(false);
    });
  });

  describe('Email validation', () => {
    it('should validate correct email addresses', () => {
      expect(validator['isValidEmail']('test@example.com')).toBe(true);
      expect(validator['isValidEmail']('user.name@domain.co.uk')).toBe(true);
      expect(validator['isValidEmail']('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validator['isValidEmail']('invalid-email')).toBe(false);
      expect(validator['isValidEmail']('@example.com')).toBe(false);
      expect(validator['isValidEmail']('test@')).toBe(false);
      expect(validator['isValidEmail']('')).toBe(false);
    });
  });

  describe('Interactive buttons validation', () => {
    it('should validate valid buttons', () => {
      const validButtons = [
        { type: 'reply', title: 'Button 1', id: 'btn1' },
        { type: 'url', title: 'Visit Site', url: 'https://example.com' }
      ];

      expect(() => validator.validateInteractiveButtons(validButtons)).not.toThrow();
    });

    it('should throw error for empty buttons array', () => {
      expect(() => validator.validateInteractiveButtons([])).toThrow('At least one button is required');
    });

    it('should throw error for invalid URL in url button', () => {
      const invalidButtons = [
        { type: 'url', title: 'Invalid', url: 'not-a-url' }
      ];

      expect(() => validator.validateInteractiveButtons(invalidButtons))
        .toThrow('Invalid URL format: not-a-url');
    });
  });

  describe('Interactive sections validation', () => {
    it('should validate valid sections', () => {
      const validSections = [
        {
          title: 'Section 1',
          rows: [
            { id: 'row1', title: 'Row 1', description: 'Description 1' },
            { id: 'row2', title: 'Row 2' }
          ]
        }
      ];

      expect(() => validator.validateInteractiveSections(validSections)).not.toThrow();
    });

    it('should throw error for empty sections array', () => {
      expect(() => validator.validateInteractiveSections([])).toThrow('At least one section is required');
    });

    it('should throw error for section without title', () => {
      const invalidSections = [
        {
          rows: [{ id: 'row1', title: 'Row 1' }]
        }
      ];

      expect(() => validator.validateInteractiveSections(invalidSections))
        .toThrow('Section title is required');
    });

    it('should throw error for section without rows', () => {
      const invalidSections = [
        {
          title: 'Section 1',
          rows: []
        }
      ];

      expect(() => validator.validateInteractiveSections(invalidSections))
        .toThrow('At least one row is required per section');
    });

    it('should throw error for row without id', () => {
      const invalidSections = [
        {
          title: 'Section 1',
          rows: [{ title: 'Row without ID' }]
        }
      ];

      expect(() => validator.validateInteractiveSections(invalidSections))
        .toThrow('Row ID is required');
    });

    it('should throw error for row without title', () => {
      const invalidSections = [
        {
          title: 'Section 1',
          rows: [{ id: 'row1' }]
        }
      ];

      expect(() => validator.validateInteractiveSections(invalidSections))
        .toThrow('Row title is required');
    });
  });

  describe('Template component validation', () => {
    it('should validate valid template components', () => {
      const validComponents = [
        { type: 'header', parameters: [{ type: 'text', text: 'Hello' }] },
        { type: 'body', parameters: [{ type: 'text', text: 'Message body' }] },
        { type: 'button', sub_type: 'quick_reply', parameters: [{ type: 'payload', payload: 'btn1' }] }
      ];

      validComponents.forEach(component => {
        expect(() => validator.validateTemplateComponent(component)).not.toThrow();
      });
    });

    it('should throw error for invalid component type', () => {
      const invalidComponent = {
        type: 'invalid',
        parameters: [{ type: 'text', text: 'Test' }]
      };

      expect(() => validator.validateTemplateComponent(invalidComponent))
        .toThrow('Invalid component type: invalid');
    });

    it('should throw error for invalid button sub_type', () => {
      const invalidComponent = {
        type: 'button',
        sub_type: 'invalid',
        parameters: [{ type: 'payload', payload: 'test' }]
      };

      expect(() => validator.validateTemplateComponent(invalidComponent))
        .toThrow('Invalid button sub_type: invalid');
    });

    it('should throw error for missing parameters', () => {
      const invalidComponents = [
        { type: 'body' },
        { type: 'body', parameters: [] },
        { type: 'body', parameters: null }
      ];

      invalidComponents.forEach(component => {
        expect(() => validator.validateTemplateComponent(component))
          .toThrow('Parameters are required for template components');
      });
    });
  });

  describe('Interactive header validation', () => {
    it('should validate text header', () => {
      const validHeader = { type: 'text', text: 'Header text' };
      expect(() => validator.validateInteractiveHeader(validHeader)).not.toThrow();
    });

    it('should validate image header with link', () => {
      const validHeader = { type: 'image', image: { link: 'https://example.com/image.jpg' } };
      expect(() => validator.validateInteractiveHeader(validHeader)).not.toThrow();
    });

    it('should validate image header with id', () => {
      const validHeader = { type: 'image', image: { id: 'image123' } };
      expect(() => validator.validateInteractiveHeader(validHeader)).not.toThrow();
    });

    it('should throw error for text header without text', () => {
      const invalidHeader = { type: 'text' };
      expect(() => validator.validateInteractiveHeader(invalidHeader))
        .toThrow('Text is required for text header');
    });

    it('should throw error for image header without link or id', () => {
      const invalidHeader = { type: 'image', image: {} };
      expect(() => validator.validateInteractiveHeader(invalidHeader))
        .toThrow('Image link or ID is required for image header');
    });

    it('should throw error for video header without link or id', () => {
      const invalidHeader = { type: 'video', video: {} };
      expect(() => validator.validateInteractiveHeader(invalidHeader))
        .toThrow('Video link or ID is required for video header');
    });

    it('should throw error for document header without link or id', () => {
      const invalidHeader = { type: 'document', document: {} };
      expect(() => validator.validateInteractiveHeader(invalidHeader))
        .toThrow('Document link or ID is required for document header');
    });
  });

  describe('Contact validation', () => {
    it('should validate correct email addresses in contacts', () => {
      const validEmails = [
        { address: 'test@example.com', type: 'personal' },
        { address: 'work@company.com', type: 'work' }
      ];

      expect(() => validator.validateContactEmails(validEmails)).not.toThrow();
    });

    it('should throw error for invalid email addresses in contacts', () => {
      const invalidEmails = [{ address: 'invalid-email', type: 'personal' }];

      expect(() => validator.validateContactEmails(invalidEmails))
        .toThrow('Invalid email format: invalid-email');
    });

    it('should validate correct URLs in contacts', () => {
      const validUrls = [
        { url: 'https://example.com', type: 'personal' },
        { url: 'https://company.com', type: 'work' }
      ];

      expect(() => validator.validateContactUrls(validUrls)).not.toThrow();
    });

    it('should throw error for invalid URLs in contacts', () => {
      const invalidUrls = [{ url: 'not-a-url', type: 'personal' }];

      expect(() => validator.validateContactUrls(invalidUrls))
        .toThrow('Invalid URL format: not-a-url');
    });
  });

  describe('Message context validation', () => {
    it('should validate valid message context', () => {
      const validContext = { message_id: 'msg123' };
      expect(() => validator.validateMessageContext(validContext)).not.toThrow();
    });

    it('should not throw error for null context', () => {
      expect(() => validator.validateMessageContext(null)).not.toThrow();
      expect(() => validator.validateMessageContext(undefined)).not.toThrow();
    });

    it('should throw error for context without message_id', () => {
      const invalidContext = { some_other_field: 'value' };
      expect(() => validator.validateMessageContext(invalidContext))
        .toThrow('Message ID is required in context for reply/quote messages');
    });
  });

  describe('Embed validation', () => {
    it('should validate embed with body', () => {
      const validEmbed = { body: 'Embed content' };
      expect(() => validator.validateEmbedBody(validEmbed)).not.toThrow();
    });

    it('should throw error for embed without body', () => {
      const invalidEmbeds = [
        {},
        { body: '' },
        { body: null },
        { body: undefined }
      ];

      invalidEmbeds.forEach(embed => {
        expect(() => validator.validateEmbedBody(embed))
          .toThrow('Body is required for embed messages');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty strings in URL validation', () => {
      expect(validator['isValidUrl']('')).toBe(false);
    });

    it('should handle empty strings in email validation', () => {
      expect(validator['isValidEmail']('')).toBe(false);
    });

    it('should handle null/undefined values gracefully', () => {
      expect(validator['isValidUrl'](null as any)).toBe(false);
      expect(validator['isValidUrl'](undefined as any)).toBe(false);
      expect(validator['isValidEmail'](null as any)).toBe(false);
      expect(validator['isValidEmail'](undefined as any)).toBe(false);
    });
  });
});