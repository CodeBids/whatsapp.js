import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { TemplateManager } from '../../src/client/actions/Templates';
import type { CreateTemplatePayload } from '../../src/types';

/**
 * Tests for TemplateManager (message templates management API).
 */

function createMockClient(overrides: Partial<{ wabaId: string | null }> = {}) {
  return {
    getWabaId: jest.fn(() => (overrides.wabaId === undefined ? '9999999999' : overrides.wabaId)),
    makeGraphRequest: jest
      .fn<(path: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
  };
}

const validPayload: CreateTemplatePayload = {
  name: 'order_confirmation',
  language: 'en_US',
  category: 'UTILITY',
  components: [
    { type: 'BODY', text: 'Your order {{1}} has shipped', example: { body_text: [['12345']] } },
  ],
};

describe('TemplateManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: TemplateManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new TemplateManager(client as any);
  });

  describe('create', () => {
    it('creates a template with valid data', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ id: 'tpl_1', status: 'PENDING', category: 'UTILITY' });

      const result = await manager.create(validPayload);

      expect(result.id).toBe('tpl_1');
      expect(client.makeGraphRequest).toHaveBeenCalledWith('9999999999/message_templates', 'POST', validPayload);
    });

    it('rejects invalid template names', async () => {
      await expect(manager.create({ ...validPayload, name: 'Invalid Name!' }))
        .rejects.toThrow(/lowercase letters, numbers and underscores/);
    });

    it('rejects a missing language', async () => {
      await expect(manager.create({ ...validPayload, language: '' }))
        .rejects.toThrow(/language is required/);
    });

    it('rejects a missing category', async () => {
      await expect(manager.create({ ...validPayload, category: undefined as any }))
        .rejects.toThrow(/category is required/);
    });

    it('rejects empty components', async () => {
      await expect(manager.create({ ...validPayload, components: [] }))
        .rejects.toThrow(/At least one component/);
    });

    it('throws when wabaId is not configured', async () => {
      client = createMockClient({ wabaId: null });
      manager = new TemplateManager(client as any);

      await expect(manager.create(validPayload)).rejects.toThrow(/wabaId is required/);
    });
  });

  describe('list', () => {
    it('lists templates with default fields', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.list();

      expect(client.makeGraphRequest).toHaveBeenCalledWith(
        expect.stringMatching(/^9999999999\/message_templates\?fields=/),
        'GET',
      );
    });

    it('applies status/category/name filters', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.list({ status: 'APPROVED', category: 'MARKETING', name: 'promo' });

      const path = client.makeGraphRequest.mock.calls[0][0];
      expect(path).toContain('status=APPROVED');
      expect(path).toContain('category=MARKETING');
      expect(path).toContain('name=promo');
    });
  });

  describe('get', () => {
    it('gets a template by ID', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ id: 'tpl_1', name: 'order_confirmation' });

      const result = await manager.get('tpl_1');

      expect(result.name).toBe('order_confirmation');
      expect(client.makeGraphRequest).toHaveBeenCalledWith(expect.stringMatching(/^tpl_1\?fields=/), 'GET');
    });

    it('throws when templateId is missing', async () => {
      await expect(manager.get('')).rejects.toThrow(/templateId is required/);
    });
  });

  describe('update', () => {
    it('updates a template\'s category', async () => {
      await manager.update('tpl_1', { category: 'MARKETING' });

      expect(client.makeGraphRequest).toHaveBeenCalledWith('tpl_1', 'POST', { category: 'MARKETING' });
    });

    it('throws when neither category nor components are provided', async () => {
      await expect(manager.update('tpl_1', {})).rejects.toThrow(/Provide at least a category or components/);
    });

    it('throws when templateId is missing', async () => {
      await expect(manager.update('', { category: 'MARKETING' })).rejects.toThrow(/templateId is required/);
    });
  });

  describe('delete', () => {
    it('deletes every language variant by name', async () => {
      await manager.delete({ name: 'order_confirmation' });

      expect(client.makeGraphRequest).toHaveBeenCalledWith(
        '9999999999/message_templates?name=order_confirmation',
        'DELETE',
      );
    });

    it('narrows deletion to a single language with hsm_id', async () => {
      await manager.delete({ name: 'order_confirmation', hsm_id: 'tpl_1' });

      const path = client.makeGraphRequest.mock.calls[0][0];
      expect(path).toContain('name=order_confirmation');
      expect(path).toContain('hsm_id=tpl_1');
    });

    it('throws when name is missing', async () => {
      await expect(manager.delete({ name: '' })).rejects.toThrow(/name is required/);
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeGraphRequest.mockRejectedValueOnce(new Error('Template already exists'));

      await expect(manager.create(validPayload)).rejects.toThrow('Template already exists');
    });
  });
});
