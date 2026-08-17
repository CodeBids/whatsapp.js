export type TemplateCategory = "AUTHENTICATION" | "MARKETING" | "UTILITY";
export type TemplateStatus = "APPROVED" | "IN_APPEAL" | "PENDING" | "REJECTED" | "PENDING_DELETION" | "DELETED" | "DISABLED" | "PAUSED" | "LIMIT_EXCEEDED";
export type TemplateButtonType = "QUICK_REPLY" | "URL" | "PHONE_NUMBER" | "COPY_CODE" | "OTP" | "CATALOG" | "MPM" | "FLOW";
export interface TemplateCreationButton {
    type: TemplateButtonType;
    text?: string;
    url?: string;
    phone_number?: string;
    example?: string[];
    flow_id?: string;
    flow_action?: "navigate" | "data_exchange";
    otp_type?: "COPY_CODE" | "ONE_TAP" | "ZERO_TAP";
}
/** A component within a template's structure, as sent to / returned from the Business Management API. */
export interface TemplateCreationComponent {
    type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
    format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION";
    text?: string;
    example?: {
        header_text?: string[];
        header_handle?: string[];
        body_text?: string[][];
    };
    buttons?: TemplateCreationButton[];
}
export interface CreateTemplatePayload {
    /** Lowercase letters, numbers and underscores only */
    name: string;
    /** Template language code (e.g. "en_US") */
    language: string;
    category: TemplateCategory;
    components: TemplateCreationComponent[];
    /** Whether Meta may automatically recategorize the template instead of rejecting it */
    allow_category_change?: boolean;
}
export interface CreateTemplateResponse {
    id: string;
    status: TemplateStatus;
    category: TemplateCategory;
}
export interface TemplateRecord {
    id: string;
    name: string;
    language: string;
    status: TemplateStatus;
    category: TemplateCategory;
    components: TemplateCreationComponent[];
    rejected_reason?: string;
    quality_score?: {
        score: string;
        date?: string;
    };
}
export interface TemplatePaging {
    cursors?: {
        before?: string;
        after?: string;
    };
    next?: string;
    previous?: string;
}
export interface TemplateListResponse {
    data: TemplateRecord[];
    paging?: TemplatePaging;
}
export interface ListTemplatesParams {
    fields?: string[];
    limit?: number;
    after?: string;
    before?: string;
    status?: TemplateStatus;
    category?: TemplateCategory;
    /** Filter by exact template name */
    name?: string;
}
export interface UpdateTemplatePayload {
    category?: TemplateCategory;
    components?: TemplateCreationComponent[];
}
export interface DeleteTemplateParams {
    /** Template name. Deletes every language variant unless hsm_id narrows it to one. */
    name: string;
    /** Template ID; when provided, only that language variant is deleted */
    hsm_id?: string;
}
export interface TemplateSuccessResponse {
    success: boolean;
}
