import type {
  CreateFlowPayload,
  CreateFlowResponse,
  FlowAssetListResponse,
  FlowDetails,
  FlowListResponse,
  FlowPreviewResponse,
  FlowSuccessResponse,
  ListFlowsParams,
  UpdateFlowMetadataPayload,
  UploadFlowJsonResponse,
} from "../../types"
import { WhatsAppApiException } from "../../errors/Messages"
import type { Client } from "../Client"

const DEFAULT_GET_FIELDS = ["id", "name", "status", "categories", "validation_errors"]

/**
 * Manages WhatsApp Flows: creation, metadata and JSON updates, publishing, deprecation,
 * deletion, and previews. `create()` and `list()` require `wabaId` to be set on the Client;
 * the rest operate directly on a Flow ID.
 */
export class FlowManager {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  private requireWabaId(): string {
    const wabaId = this.client.getWabaId()

    if (!wabaId) {
      throw new WhatsAppApiException(
        "A wabaId is required to manage Flows. Pass it when creating the Client.",
        0,
      )
    }

    return wabaId
  }

  /**
   * Creates a new Flow.
   * @param payload Flow name, categories, and optional JSON/clone/endpoint/publish options
   * @returns The created Flow's ID and any validation errors found in flow_json
   */
  async create(payload: CreateFlowPayload): Promise<CreateFlowResponse> {
    if (!payload.name) {
      throw new WhatsAppApiException("Flow name is required", 0)
    }

    if (!payload.categories || payload.categories.length === 0) {
      throw new WhatsAppApiException("At least one category is required to create a Flow", 0)
    }

    const wabaId = this.requireWabaId()

    return this.client.makeGraphRequest<CreateFlowResponse>(`${wabaId}/flows`, "POST", payload)
  }

  /**
   * Lists Flows on the WhatsApp Business Account.
   * @param params Filtering and pagination options
   * @returns The list of Flows
   */
  async list(params: ListFlowsParams = {}): Promise<FlowListResponse> {
    const wabaId = this.requireWabaId()

    const query = new URLSearchParams()
    query.set("fields", (params.fields ?? DEFAULT_GET_FIELDS).join(","))

    if (params.limit) query.set("limit", String(params.limit))
    if (params.after) query.set("after", params.after)
    if (params.before) query.set("before", params.before)

    return this.client.makeGraphRequest<FlowListResponse>(`${wabaId}/flows?${query.toString()}`, "GET")
  }

  /**
   * Gets details for a single Flow.
   * @param flowId Flow ID
   * @param fields Fields to request
   * @returns The Flow details
   */
  async get(flowId: string, fields: string[] = DEFAULT_GET_FIELDS): Promise<FlowDetails> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    const query = new URLSearchParams({ fields: fields.join(",") })

    return this.client.makeGraphRequest<FlowDetails>(`${flowId}?${query.toString()}`, "GET")
  }

  /**
   * Updates a Flow's metadata (name, categories, endpoint_uri, application_id).
   * @param flowId Flow ID
   * @param updates Fields to update
   * @returns API response
   */
  async updateMetadata(flowId: string, updates: UpdateFlowMetadataPayload): Promise<FlowSuccessResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    if (Object.keys(updates).length === 0) {
      throw new WhatsAppApiException("Provide at least one field to update", 0)
    }

    return this.client.makeGraphRequest<FlowSuccessResponse>(flowId, "POST", updates)
  }

  /**
   * Uploads (or replaces) a Flow's JSON definition.
   * @param flowId Flow ID
   * @param flowJson Flow JSON, either as a raw string or an already-serialized Buffer
   * @param filename Filename reported to the API (defaults to "flow.json")
   * @returns Upload result, including validation errors if the JSON is invalid
   */
  async updateJson(flowId: string, flowJson: string | Buffer, filename = "flow.json"): Promise<UploadFlowJsonResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    if (!flowJson) {
      throw new WhatsAppApiException("flowJson is required", 0)
    }

    const buffer = Buffer.isBuffer(flowJson) ? flowJson : Buffer.from(flowJson, "utf-8")

    return this.client.uploadFlowAsset<UploadFlowJsonResponse>(flowId, buffer, filename)
  }

  /**
   * Publishes a Flow, making it usable in flow messages. The Flow must have valid JSON
   * uploaded first. Published Flows cannot be edited or deleted, only deprecated.
   * @param flowId Flow ID
   * @returns API response
   */
  async publish(flowId: string): Promise<FlowSuccessResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    return this.client.makeGraphRequest<FlowSuccessResponse>(`${flowId}/publish`, "POST")
  }

  /**
   * Deprecates a published Flow so it can no longer be sent to users.
   * @param flowId Flow ID
   * @returns API response
   */
  async deprecate(flowId: string): Promise<FlowSuccessResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    return this.client.makeGraphRequest<FlowSuccessResponse>(`${flowId}/deprecate`, "POST")
  }

  /**
   * Deletes a Flow. Only Flows in DRAFT status can be deleted.
   * @param flowId Flow ID
   * @returns API response
   */
  async delete(flowId: string): Promise<FlowSuccessResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    return this.client.makeGraphRequest<FlowSuccessResponse>(flowId, "DELETE")
  }

  /**
   * Lists the assets uploaded to a Flow (e.g. its flow.json).
   * @param flowId Flow ID
   * @returns The Flow's assets, with download URLs
   */
  async getAssets(flowId: string): Promise<FlowAssetListResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    return this.client.makeGraphRequest<FlowAssetListResponse>(`${flowId}/assets`, "GET")
  }

  /**
   * Gets a shareable preview URL for a Flow, valid for 30 days.
   * @param flowId Flow ID
   * @param invalidate When true, invalidates the previous preview URL and issues a new one
   * @returns The preview URL and its expiry
   */
  async getPreviewUrl(flowId: string, invalidate = false): Promise<FlowPreviewResponse> {
    if (!flowId) {
      throw new WhatsAppApiException("flowId is required", 0)
    }

    const query = new URLSearchParams({ fields: `preview.invalidate(${invalidate})` })

    return this.client.makeGraphRequest<FlowPreviewResponse>(`${flowId}?${query.toString()}`, "GET")
  }
}
