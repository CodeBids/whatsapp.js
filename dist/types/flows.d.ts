export type FlowCategory = "SIGN_UP" | "SIGN_IN" | "APPOINTMENT_BOOKING" | "LEAD_GENERATION" | "CONTACT_US" | "CUSTOMER_SUPPORT" | "SURVEY" | "OTHER";
export type FlowStatus = "DRAFT" | "PUBLISHED" | "DEPRECATED" | "BLOCKED" | "THROTTLED";
export interface FlowValidationError {
    error: string;
    error_type?: string;
    message: string;
    line_start?: number;
    line_end?: number;
    column_start?: number;
    column_end?: number;
}
export interface CreateFlowPayload {
    name: string;
    categories: FlowCategory[];
    /** Create the new flow as a copy of an existing one */
    clone_flow_id?: string;
    /** Data endpoint URL, required for flows that exchange data with your backend */
    endpoint_uri?: string;
    /** Flow JSON as a string; alternative to uploading it afterwards with updateJson() */
    flow_json?: string;
    /** Publish immediately after creation (only if flow_json validates with no errors) */
    publish?: boolean;
}
export interface CreateFlowResponse {
    id: string;
    success?: boolean;
    validation_errors?: FlowValidationError[];
}
export interface FlowSummary {
    id: string;
    name: string;
    status: FlowStatus;
    categories: FlowCategory[];
}
export interface FlowDetails extends FlowSummary {
    validation_errors?: FlowValidationError[];
    json_version?: string;
    data_api_version?: string;
    endpoint_uri?: string;
    preview?: {
        preview_url: string;
        expires_at: string;
    };
    whatsapp_business_account?: {
        id: string;
    };
    application?: {
        id: string;
        name?: string;
    };
}
export interface FlowPaging {
    cursors?: {
        before?: string;
        after?: string;
    };
    next?: string;
    previous?: string;
}
export interface FlowListResponse {
    data: FlowSummary[];
    paging?: FlowPaging;
}
export interface ListFlowsParams {
    fields?: string[];
    limit?: number;
    after?: string;
    before?: string;
}
export interface UpdateFlowMetadataPayload {
    name?: string;
    categories?: FlowCategory[];
    endpoint_uri?: string;
    application_id?: string;
}
export interface FlowAsset {
    name: string;
    asset_type: string;
    download_url: string;
}
export interface FlowAssetListResponse {
    data: FlowAsset[];
    paging?: FlowPaging;
}
export interface UploadFlowJsonResponse {
    success: boolean;
    validation_errors?: FlowValidationError[];
}
export interface FlowSuccessResponse {
    success: boolean;
}
export interface FlowPreviewResponse {
    id: string;
    preview: {
        preview_url: string;
        expires_at: string;
    };
}
