import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { FlowManager } from '../../src/client/actions/Flows';
import type { CreateFlowPayload } from '../../src/types';

/**
 * Tests for FlowManager (WhatsApp Flows management API).
 */

function createMockClient(overrides: Partial<{ wabaId: string | null }> = {}) {
  return {
    getWabaId: jest.fn(() => (overrides.wabaId === undefined ? '9999999999' : overrides.wabaId)),
    makeGraphRequest: jest
      .fn<(path: string, method: string, data?: unknown) => Promise<any>>()
      .mockResolvedValue({ success: true }),
    uploadFlowAsset: jest
      .fn<(flowId: string, buffer: Buffer, filename?: string) => Promise<any>>()
      .mockResolvedValue({ success: true }),
  };
}

const validPayload: CreateFlowPayload = {
  name: 'appointment_booking',
  categories: ['APPOINTMENT_BOOKING'],
};

describe('FlowManager', () => {
  let client: ReturnType<typeof createMockClient>;
  let manager: FlowManager;

  beforeEach(() => {
    client = createMockClient();
    manager = new FlowManager(client as any);
  });

  describe('create', () => {
    it('creates a flow with valid data', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ id: 'flow_1' });

      const result = await manager.create(validPayload);

      expect(result.id).toBe('flow_1');
      expect(client.makeGraphRequest).toHaveBeenCalledWith('9999999999/flows', 'POST', validPayload);
    });

    it('rejects a missing name', async () => {
      await expect(manager.create({ ...validPayload, name: '' })).rejects.toThrow(/Flow name is required/);
    });

    it('rejects empty categories', async () => {
      await expect(manager.create({ ...validPayload, categories: [] })).rejects.toThrow(/At least one category/);
    });

    it('throws when wabaId is not configured', async () => {
      client = createMockClient({ wabaId: null });
      manager = new FlowManager(client as any);

      await expect(manager.create(validPayload)).rejects.toThrow(/wabaId is required/);
    });
  });

  describe('list', () => {
    it('lists flows with default fields', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.list();

      expect(client.makeGraphRequest).toHaveBeenCalledWith(
        expect.stringMatching(/^9999999999\/flows\?fields=/),
        'GET',
      );
    });
  });

  describe('get', () => {
    it('gets a flow by ID', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ id: 'flow_1', name: 'appointment_booking' });

      const result = await manager.get('flow_1');

      expect(result.name).toBe('appointment_booking');
      expect(client.makeGraphRequest).toHaveBeenCalledWith(expect.stringMatching(/^flow_1\?fields=/), 'GET');
    });

    it('throws when flowId is missing', async () => {
      await expect(manager.get('')).rejects.toThrow(/flowId is required/);
    });
  });

  describe('updateMetadata', () => {
    it('updates flow metadata', async () => {
      await manager.updateMetadata('flow_1', { name: 'new_name' });

      expect(client.makeGraphRequest).toHaveBeenCalledWith('flow_1', 'POST', { name: 'new_name' });
    });

    it('throws when no updates are provided', async () => {
      await expect(manager.updateMetadata('flow_1', {})).rejects.toThrow(/Provide at least one field/);
    });
  });

  describe('updateJson', () => {
    it('uploads a string flow JSON as a buffer', async () => {
      await manager.updateJson('flow_1', '{"version":"3.0"}');

      expect(client.uploadFlowAsset).toHaveBeenCalledWith('flow_1', Buffer.from('{"version":"3.0"}'), 'flow.json');
    });

    it('accepts a Buffer directly', async () => {
      const buffer = Buffer.from('{"version":"3.0"}');
      await manager.updateJson('flow_1', buffer, 'custom.json');

      expect(client.uploadFlowAsset).toHaveBeenCalledWith('flow_1', buffer, 'custom.json');
    });

    it('throws when flowJson is missing', async () => {
      await expect(manager.updateJson('flow_1', '')).rejects.toThrow(/flowJson is required/);
    });
  });

  describe('publish', () => {
    it('publishes the flow', async () => {
      await manager.publish('flow_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('flow_1/publish', 'POST');
    });
  });

  describe('deprecate', () => {
    it('deprecates the flow', async () => {
      await manager.deprecate('flow_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('flow_1/deprecate', 'POST');
    });
  });

  describe('delete', () => {
    it('deletes the flow', async () => {
      await manager.delete('flow_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('flow_1', 'DELETE');
    });
  });

  describe('getAssets', () => {
    it('lists flow assets', async () => {
      client.makeGraphRequest.mockResolvedValueOnce({ data: [] });

      await manager.getAssets('flow_1');

      expect(client.makeGraphRequest).toHaveBeenCalledWith('flow_1/assets', 'GET');
    });
  });

  describe('getPreviewUrl', () => {
    it('requests a preview URL without invalidating by default', async () => {
      await manager.getPreviewUrl('flow_1');

      const path = client.makeGraphRequest.mock.calls[0][0];
      expect(path).toContain('flow_1?fields=');
      expect(decodeURIComponent(path)).toContain('preview.invalidate(false)');
    });

    it('requests a fresh preview URL when invalidate is true', async () => {
      await manager.getPreviewUrl('flow_1', true);

      const path = client.makeGraphRequest.mock.calls[0][0];
      expect(decodeURIComponent(path)).toContain('preview.invalidate(true)');
    });
  });

  describe('error propagation', () => {
    it('propagates API errors', async () => {
      client.makeGraphRequest.mockRejectedValueOnce(new Error('Flow not found'));

      await expect(manager.get('flow_1')).rejects.toThrow('Flow not found');
    });
  });
});
