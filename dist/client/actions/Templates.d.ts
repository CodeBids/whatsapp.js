import type { CreateTemplatePayload, CreateTemplateResponse, DeleteTemplateParams, ListTemplatesParams, TemplateListResponse, TemplateRecord, TemplateSuccessResponse, UpdateTemplatePayload } from "../../types";
import type { Client } from "../Client";
/**
 * Manages WhatsApp message templates (create, list, get, update, delete) via the
 * Business Management API. All methods require `wabaId` to be set on the Client,
 * since templates live on the WhatsApp Business Account, not on a single phone number.
 */
export declare class TemplateManager {
    private client;
    constructor(client: Client);
    private requireWabaId;
    /**
     * Creates a new message template, submitting it for Meta's review.
     * @param payload Template name, language, category and components
     * @returns The created template's ID and initial status
     */
    create(payload: CreateTemplatePayload): Promise<CreateTemplateResponse>;
    /**
     * Lists message templates on the WhatsApp Business Account.
     * @param params Filtering and pagination options
     * @returns The list of templates
     */
    list(params?: ListTemplatesParams): Promise<TemplateListResponse>;
    /**
     * Gets a single template by ID.
     * @param templateId Template ID
     * @param fields Fields to request
     * @returns The template
     */
    get(templateId: string, fields?: string[]): Promise<TemplateRecord>;
    /**
     * Edits an existing template's category and/or components. Editing a template
     * that has already been approved resets it to PENDING review.
     * @param templateId Template ID
     * @param updates Fields to update
     * @returns API response
     */
    update(templateId: string, updates: UpdateTemplatePayload): Promise<TemplateSuccessResponse>;
    /**
     * Deletes a template by name. Deletes every language variant unless `hsm_id` is provided
     * to target a single one.
     * @param params Name (required) and optional hsm_id
     * @returns API response
     */
    delete(params: DeleteTemplateParams): Promise<TemplateSuccessResponse>;
}
