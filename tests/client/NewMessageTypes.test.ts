import { describe, it, expect, jest, beforeEach } from '@jest/globals';

/**
 * Tests for new message types: location request, flow, address, product, product list.
 * Uses the same mock-based validation pattern as MessageValidation.test.ts.
 */

class MockWhatsAppApiException extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'WhatsAppApiException';
  }
}

class NewMessageTypeValidator {
  validateLocationRequest(payload: any): void {
    if (!payload.locationRequest) {
      throw new MockWhatsAppApiException('locationRequest is required', 0);
    }
    if (!payload.locationRequest.body) {
      throw new MockWhatsAppApiException('Body text is required for location request messages', 0);
    }
  }

  validateFlow(payload: any): void {
    if (!payload.flow) {
      throw new MockWhatsAppApiException('flow is required', 0);
    }
    if (!payload.flow.flow_id) {
      throw new MockWhatsAppApiException('Flow ID is required for flow messages', 0);
    }
    if (!payload.flow.flow_cta) {
      throw new MockWhatsAppApiException('Flow CTA text is required for flow messages', 0);
    }
    if (!payload.flow.body) {
      throw new MockWhatsAppApiException('Body text is required for flow messages', 0);
    }
  }

  validateAddressMessage(payload: any): void {
    if (!payload.addressMessage) {
      throw new MockWhatsAppApiException('addressMessage is required', 0);
    }
    if (!payload.addressMessage.country) {
      throw new MockWhatsAppApiException('Country is required for address messages', 0);
    }
  }

  validateProduct(payload: any): void {
    if (!payload.product) {
      throw new MockWhatsAppApiException('product is required', 0);
    }
    if (!payload.product.catalog_id) {
      throw new MockWhatsAppApiException('Catalog ID is required for product messages', 0);
    }
    if (!payload.product.product_retailer_id) {
      throw new MockWhatsAppApiException('Product retailer ID is required for product messages', 0);
    }
  }

  validateProductList(payload: any): void {
    if (!payload.productList) {
      throw new MockWhatsAppApiException('productList is required', 0);
    }
    if (!payload.productList.catalog_id) {
      throw new MockWhatsAppApiException('Catalog ID is required for product list messages', 0);
    }
    if (!payload.productList.body) {
      throw new MockWhatsAppApiException('Body text is required for product list messages', 0);
    }
    if (!payload.productList.sections || payload.productList.sections.length === 0) {
      throw new MockWhatsAppApiException('At least one section is required for product list messages', 0);
    }
  }

  buildLocationRequestBody(payload: any): any {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload.to,
      type: 'interactive',
      interactive: {
        type: 'location_request_message',
        body: {
          text: payload.locationRequest.body,
        },
        action: {
          name: 'send_location',
        },
      },
    };
  }

  buildFlowBody(payload: any): any {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload.to,
      type: 'interactive',
      interactive: {
        type: 'flow',
        ...(payload.flow.header ? {
          header: { type: 'text', text: payload.flow.header },
        } : {}),
        body: { text: payload.flow.body },
        ...(payload.flow.footer ? {
          footer: { text: payload.flow.footer },
        } : {}),
        action: {
          name: 'flow',
          parameters: {
            flow_message_version: payload.flow.flow_message_version || '3',
            flow_token: payload.flow.flow_token || 'unused',
            flow_id: payload.flow.flow_id,
            flow_cta: payload.flow.flow_cta,
            ...(payload.flow.flow_action ? { flow_action: payload.flow.flow_action } : {}),
            ...(payload.flow.flow_action_payload ? { flow_action_payload: payload.flow.flow_action_payload } : {}),
          },
        },
      },
    };
  }

  buildAddressMessageBody(payload: any): any {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload.to,
      type: 'address_message',
      address_message: {
        country: payload.addressMessage.country,
        ...(payload.addressMessage.values ? { values: payload.addressMessage.values } : {}),
        ...(payload.addressMessage.saved_addresses ? { saved_addresses: payload.addressMessage.saved_addresses } : {}),
      },
    };
  }

  buildProductBody(payload: any): any {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload.to,
      type: 'interactive',
      interactive: {
        type: 'product',
        body: { text: '' },
        action: {
          catalog_id: payload.product.catalog_id,
          product_retailer_id: payload.product.product_retailer_id,
        },
      },
    };
  }

  buildProductListBody(payload: any): any {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload.to,
      type: 'interactive',
      interactive: {
        type: 'product_list',
        ...(payload.productList.header ? {
          header: { type: 'text', text: payload.productList.header },
        } : {}),
        body: { text: payload.productList.body },
        ...(payload.productList.footer ? {
          footer: { text: payload.productList.footer },
        } : {}),
        action: {
          catalog_id: payload.productList.catalog_id,
          sections: payload.productList.sections.map((s: any) => ({
            title: s.title,
            product_items: s.product_items,
          })),
        },
      },
    };
  }
}

describe('New Message Types', () => {
  let validator: NewMessageTypeValidator;

  beforeEach(() => {
    validator = new NewMessageTypeValidator();
  });

  describe('Location Request Messages', () => {
    it('should validate a valid location request', () => {
      const payload = {
        to: '5491155551234',
        locationRequest: { body: 'Please share your location' },
      };
      expect(() => validator.validateLocationRequest(payload)).not.toThrow();
    });

    it('should throw error when locationRequest is missing', () => {
      expect(() => validator.validateLocationRequest({}))
        .toThrow('locationRequest is required');
    });

    it('should throw error when body text is missing', () => {
      const payload = { locationRequest: {} };
      expect(() => validator.validateLocationRequest(payload))
        .toThrow('Body text is required for location request messages');
    });

    it('should throw error when body text is empty', () => {
      const payload = { locationRequest: { body: '' } };
      expect(() => validator.validateLocationRequest(payload))
        .toThrow('Body text is required for location request messages');
    });

    it('should build correct location request body', () => {
      const payload = {
        to: '5491155551234',
        locationRequest: { body: 'Share your location for delivery' },
      };

      const body = validator.buildLocationRequestBody(payload);

      expect(body.messaging_product).toBe('whatsapp');
      expect(body.to).toBe('5491155551234');
      expect(body.type).toBe('interactive');
      expect(body.interactive.type).toBe('location_request_message');
      expect(body.interactive.body.text).toBe('Share your location for delivery');
      expect(body.interactive.action.name).toBe('send_location');
    });
  });

  describe('Flow Messages', () => {
    const validFlow = {
      to: '5491155551234',
      flow: {
        body: 'Book your appointment',
        flow_id: 'FLOW_123',
        flow_cta: 'Book Now',
      },
    };

    it('should validate a valid flow message', () => {
      expect(() => validator.validateFlow(validFlow)).not.toThrow();
    });

    it('should throw error when flow is missing', () => {
      expect(() => validator.validateFlow({}))
        .toThrow('flow is required');
    });

    it('should throw error when flow_id is missing', () => {
      const payload = { flow: { body: 'Test', flow_cta: 'Click' } };
      expect(() => validator.validateFlow(payload))
        .toThrow('Flow ID is required for flow messages');
    });

    it('should throw error when flow_cta is missing', () => {
      const payload = { flow: { body: 'Test', flow_id: 'FLOW_123' } };
      expect(() => validator.validateFlow(payload))
        .toThrow('Flow CTA text is required for flow messages');
    });

    it('should throw error when body is missing', () => {
      const payload = { flow: { flow_id: 'FLOW_123', flow_cta: 'Click' } };
      expect(() => validator.validateFlow(payload))
        .toThrow('Body text is required for flow messages');
    });

    it('should build correct flow body with minimal options', () => {
      const body = validator.buildFlowBody(validFlow);

      expect(body.type).toBe('interactive');
      expect(body.interactive.type).toBe('flow');
      expect(body.interactive.body.text).toBe('Book your appointment');
      expect(body.interactive.action.name).toBe('flow');
      expect(body.interactive.action.parameters.flow_id).toBe('FLOW_123');
      expect(body.interactive.action.parameters.flow_cta).toBe('Book Now');
      expect(body.interactive.action.parameters.flow_message_version).toBe('3');
      expect(body.interactive.action.parameters.flow_token).toBe('unused');
    });

    it('should build flow body with header and footer', () => {
      const payload = {
        to: '5491155551234',
        flow: {
          header: 'Appointment Booking',
          body: 'Select a time slot',
          footer: 'Powered by WhatsApp',
          flow_id: 'FLOW_456',
          flow_cta: 'Choose',
        },
      };

      const body = validator.buildFlowBody(payload);

      expect(body.interactive.header).toEqual({ type: 'text', text: 'Appointment Booking' });
      expect(body.interactive.footer).toEqual({ text: 'Powered by WhatsApp' });
    });

    it('should build flow body with navigate action', () => {
      const payload = {
        to: '5491155551234',
        flow: {
          body: 'Start flow',
          flow_id: 'FLOW_789',
          flow_cta: 'Begin',
          flow_action: 'navigate' as const,
          flow_action_payload: {
            screen: 'SCREEN_ONE',
            data: { key: 'value' },
          },
        },
      };

      const body = validator.buildFlowBody(payload);

      expect(body.interactive.action.parameters.flow_action).toBe('navigate');
      expect(body.interactive.action.parameters.flow_action_payload).toEqual({
        screen: 'SCREEN_ONE',
        data: { key: 'value' },
      });
    });

    it('should build flow body with custom flow_message_version and flow_token', () => {
      const payload = {
        to: '5491155551234',
        flow: {
          body: 'Test',
          flow_id: 'FLOW_100',
          flow_cta: 'Go',
          flow_message_version: '5',
          flow_token: 'my-custom-token',
        },
      };

      const body = validator.buildFlowBody(payload);

      expect(body.interactive.action.parameters.flow_message_version).toBe('5');
      expect(body.interactive.action.parameters.flow_token).toBe('my-custom-token');
    });

    it('should not include header when not provided', () => {
      const body = validator.buildFlowBody(validFlow);
      expect(body.interactive.header).toBeUndefined();
    });

    it('should not include footer when not provided', () => {
      const body = validator.buildFlowBody(validFlow);
      expect(body.interactive.footer).toBeUndefined();
    });
  });

  describe('Address Messages', () => {
    it('should validate a valid address message', () => {
      const payload = { addressMessage: { country: 'IN' } };
      expect(() => validator.validateAddressMessage(payload)).not.toThrow();
    });

    it('should throw error when addressMessage is missing', () => {
      expect(() => validator.validateAddressMessage({}))
        .toThrow('addressMessage is required');
    });

    it('should throw error when country is missing', () => {
      const payload = { addressMessage: {} };
      expect(() => validator.validateAddressMessage(payload))
        .toThrow('Country is required for address messages');
    });

    it('should throw error when country is empty', () => {
      const payload = { addressMessage: { country: '' } };
      expect(() => validator.validateAddressMessage(payload))
        .toThrow('Country is required for address messages');
    });

    it('should build correct address message body', () => {
      const payload = {
        to: '5491155551234',
        addressMessage: {
          country: 'IN',
          values: {
            name: 'John Doe',
            phone_number: '+911234567890',
            city: 'Mumbai',
          },
        },
      };

      const body = validator.buildAddressMessageBody(payload);

      expect(body.type).toBe('address_message');
      expect(body.address_message.country).toBe('IN');
      expect(body.address_message.values.name).toBe('John Doe');
      expect(body.address_message.values.city).toBe('Mumbai');
    });

    it('should build address message without optional values', () => {
      const payload = {
        to: '5491155551234',
        addressMessage: { country: 'US' },
      };

      const body = validator.buildAddressMessageBody(payload);

      expect(body.address_message.country).toBe('US');
      expect(body.address_message.values).toBeUndefined();
      expect(body.address_message.saved_addresses).toBeUndefined();
    });

    it('should build address message with saved addresses', () => {
      const payload = {
        to: '5491155551234',
        addressMessage: {
          country: 'IN',
          saved_addresses: [
            {
              id: 'addr_1',
              value: { name: 'Home', address: '123 Main St', city: 'Delhi' },
            },
          ],
        },
      };

      const body = validator.buildAddressMessageBody(payload);

      expect(body.address_message.saved_addresses).toHaveLength(1);
      expect(body.address_message.saved_addresses[0].id).toBe('addr_1');
      expect(body.address_message.saved_addresses[0].value.name).toBe('Home');
    });
  });

  describe('Product Messages', () => {
    it('should validate a valid product message', () => {
      const payload = {
        product: { catalog_id: 'CAT_123', product_retailer_id: 'PROD_456' },
      };
      expect(() => validator.validateProduct(payload)).not.toThrow();
    });

    it('should throw error when product is missing', () => {
      expect(() => validator.validateProduct({}))
        .toThrow('product is required');
    });

    it('should throw error when catalog_id is missing', () => {
      const payload = { product: { product_retailer_id: 'PROD_456' } };
      expect(() => validator.validateProduct(payload))
        .toThrow('Catalog ID is required for product messages');
    });

    it('should throw error when product_retailer_id is missing', () => {
      const payload = { product: { catalog_id: 'CAT_123' } };
      expect(() => validator.validateProduct(payload))
        .toThrow('Product retailer ID is required for product messages');
    });

    it('should build correct product body', () => {
      const payload = {
        to: '5491155551234',
        product: { catalog_id: 'CAT_123', product_retailer_id: 'PROD_456' },
      };

      const body = validator.buildProductBody(payload);

      expect(body.type).toBe('interactive');
      expect(body.interactive.type).toBe('product');
      expect(body.interactive.action.catalog_id).toBe('CAT_123');
      expect(body.interactive.action.product_retailer_id).toBe('PROD_456');
    });
  });

  describe('Product List Messages', () => {
    const validProductList = {
      to: '5491155551234',
      productList: {
        catalog_id: 'CAT_123',
        body: 'Check out our products',
        sections: [
          {
            title: 'Featured',
            product_items: [{ product_retailer_id: 'PROD_1' }],
          },
        ],
      },
    };

    it('should validate a valid product list', () => {
      expect(() => validator.validateProductList(validProductList)).not.toThrow();
    });

    it('should throw error when productList is missing', () => {
      expect(() => validator.validateProductList({}))
        .toThrow('productList is required');
    });

    it('should throw error when catalog_id is missing', () => {
      const payload = {
        productList: {
          body: 'Test',
          sections: [{ title: 'S', product_items: [{ product_retailer_id: 'P1' }] }],
        },
      };
      expect(() => validator.validateProductList(payload))
        .toThrow('Catalog ID is required for product list messages');
    });

    it('should throw error when body is missing', () => {
      const payload = {
        productList: {
          catalog_id: 'CAT_123',
          sections: [{ title: 'S', product_items: [{ product_retailer_id: 'P1' }] }],
        },
      };
      expect(() => validator.validateProductList(payload))
        .toThrow('Body text is required for product list messages');
    });

    it('should throw error when sections are empty', () => {
      const payload = {
        productList: { catalog_id: 'CAT_123', body: 'Test', sections: [] },
      };
      expect(() => validator.validateProductList(payload))
        .toThrow('At least one section is required for product list messages');
    });

    it('should throw error when sections are undefined', () => {
      const payload = {
        productList: { catalog_id: 'CAT_123', body: 'Test' },
      };
      expect(() => validator.validateProductList(payload))
        .toThrow('At least one section is required for product list messages');
    });

    it('should build correct product list body', () => {
      const body = validator.buildProductListBody(validProductList);

      expect(body.type).toBe('interactive');
      expect(body.interactive.type).toBe('product_list');
      expect(body.interactive.body.text).toBe('Check out our products');
      expect(body.interactive.action.catalog_id).toBe('CAT_123');
      expect(body.interactive.action.sections).toHaveLength(1);
      expect(body.interactive.action.sections[0].title).toBe('Featured');
      expect(body.interactive.action.sections[0].product_items[0].product_retailer_id).toBe('PROD_1');
    });

    it('should build product list with header and footer', () => {
      const payload = {
        to: '5491155551234',
        productList: {
          catalog_id: 'CAT_123',
          header: 'Our Store',
          body: 'Browse products',
          footer: 'Tap to view',
          sections: [
            {
              title: 'Category A',
              product_items: [
                { product_retailer_id: 'PROD_A1' },
                { product_retailer_id: 'PROD_A2' },
              ],
            },
            {
              title: 'Category B',
              product_items: [
                { product_retailer_id: 'PROD_B1' },
              ],
            },
          ],
        },
      };

      const body = validator.buildProductListBody(payload);

      expect(body.interactive.header).toEqual({ type: 'text', text: 'Our Store' });
      expect(body.interactive.footer).toEqual({ text: 'Tap to view' });
      expect(body.interactive.action.sections).toHaveLength(2);
      expect(body.interactive.action.sections[1].product_items).toHaveLength(1);
    });

    it('should not include header when not provided', () => {
      const body = validator.buildProductListBody(validProductList);
      expect(body.interactive.header).toBeUndefined();
    });

    it('should not include footer when not provided', () => {
      const body = validator.buildProductListBody(validProductList);
      expect(body.interactive.footer).toBeUndefined();
    });
  });
});
