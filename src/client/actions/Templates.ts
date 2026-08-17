import type {
  CreateTemplatePayload,
  CreateTemplateResponse,
  DeleteTemplateParams,
  ListTemplatesParams,
  TemplateListResponse,
  TemplateRecord,
  TemplateSuccessResponse,
  UpdateTemplatePayload,
} from "../../types"
import { WhatsAppApiException } from "../../errors/Messages"
import type { Client } from "../Client"

const DEFAULT_GET_FIELDS = ["id", "name", "language", "status", "category", "components", "quality_score"]

/**
 * Manages WhatsApp message templates (create, list, get, update, delete) via the
 * Business Management API. All methods require `wabaId` to be set on the Client,
 * since templates live on the WhatsApp Business Account, not on a single phone number.
 */
export class TemplateManager {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  private requireWabaId(): string {
    const wabaId = this.client.getWabaId()

    if (!wabaId) {
      throw new WhatsAppApiException(
        "A wabaId is required to manage message templates. Pass it when creating the Client.",
        0,
      )
    }

    return wabaId
  }

  /**
   * Creates a new message template, submitting it for Meta's review.
   * @param payload Template name, language, category and components
   * @returns The created template's ID and initial status
   */
  async create(payload: CreateTemplatePayload): Promise<CreateTemplateResponse> {
    if (!payload.name || !/^[a-z0-9_]+$/.test(payload.name)) {
      throw new WhatsAppApiException(
        "Template name is required and may only contain lowercase letters, numbers and underscores",
        0,
      )
    }

    if (!payload.language) {
      throw new WhatsAppApiException("Template language is required (e.g. \"en_US\")", 0)
    }

    if (!payload.category) {
      throw new WhatsAppApiException("Template category is required (AUTHENTICATION, MARKETING or UTILITY)", 0)
    }

    if (!payload.components || payload.components.length === 0) {
      throw new WhatsAppApiException("At least one component is required to create a template", 0)
    }

    const wabaId = this.requireWabaId()

    return this.client.makeGraphRequest<CreateTemplateResponse>(`${wabaId}/message_templates`, "POST", payload)
  }

  /**
   * Lists message templates on the WhatsApp Business Account.
   * @param params Filtering and pagination options
   * @returns The list of templates
   */
  async list(params: ListTemplatesParams = {}): Promise<TemplateListResponse> {
    const wabaId = this.requireWabaId()

    const query = new URLSearchParams()
    query.set("fields", (params.fields ?? DEFAULT_GET_FIELDS).join(","))

    if (params.status) query.set("status", params.status)
    if (params.category) query.set("category", params.category)
    if (params.name) query.set("name", params.name)
    if (params.limit) query.set("limit", String(params.limit))
    if (params.after) query.set("after", params.after)
    if (params.before) query.set("before", params.before)

    return this.client.makeGraphRequest<TemplateListResponse>(
      `${wabaId}/message_templates?${query.toString()}`,
      "GET",
    )
  }

  /**
   * Gets a single template by ID.
   * @param templateId Template ID
   * @param fields Fields to request
   * @returns The template
   */
  async get(templateId: string, fields: string[] = DEFAULT_GET_FIELDS): Promise<TemplateRecord> {
    if (!templateId) {
      throw new WhatsAppApiException("templateId is required", 0)
    }

    const query = new URLSearchParams({ fields: fields.join(",") })

    return this.client.makeGraphRequest<TemplateRecord>(`${templateId}?${query.toString()}`, "GET")
  }

  /**
   * Edits an existing template's category and/or components. Editing a template
   * that has already been approved resets it to PENDING review.
   * @param templateId Template ID
   * @param updates Fields to update
   * @returns API response
   */
  async update(templateId: string, updates: UpdateTemplatePayload): Promise<TemplateSuccessResponse> {
    if (!templateId) {
      throw new WhatsAppApiException("templateId is required", 0)
    }

    if (!updates.category && !updates.components) {
      throw new WhatsAppApiException("Provide at least a category or components to update", 0)
    }

    return this.client.makeGraphRequest<TemplateSuccessResponse>(templateId, "POST", updates)
  }

  /**
   * Deletes a template by name. Deletes every language variant unless `hsm_id` is provided
   * to target a single one.
   * @param params Name (required) and optional hsm_id
   * @returns API response
   */
  async delete(params: DeleteTemplateParams): Promise<TemplateSuccessResponse> {
    if (!params.name) {
      throw new WhatsAppApiException("name is required to delete a template", 0)
    }

    const wabaId = this.requireWabaId()

    const query = new URLSearchParams({ name: params.name })
    if (params.hsm_id) query.set("hsm_id", params.hsm_id)

    return this.client.makeGraphRequest<TemplateSuccessResponse>(
      `${wabaId}/message_templates?${query.toString()}`,
      "DELETE",
    )
  }
}
