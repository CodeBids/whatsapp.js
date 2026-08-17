import type { CreateFlowPayload, CreateFlowResponse, FlowAssetListResponse, FlowDetails, FlowListResponse, FlowPreviewResponse, FlowSuccessResponse, ListFlowsParams, UpdateFlowMetadataPayload, UploadFlowJsonResponse } from "../../types";
import type { Client } from "../Client";
/**
 * Manages WhatsApp Flows: creation, metadata and JSON updates, publishing, deprecation,
 * deletion, and previews. `create()` and `list()` require `wabaId` to be set on the Client;
 * the rest operate directly on a Flow ID.
 */
export declare class FlowManager {
    private client;
    constructor(client: Client);
    private requireWabaId;
    /**
     * Creates a new Flow.
     * @param payload Flow name, categories, and optional JSON/clone/endpoint/publish options
     * @returns The created Flow's ID and any validation errors found in flow_json
     */
    create(payload: CreateFlowPayload): Promise<CreateFlowResponse>;
    /**
     * Lists Flows on the WhatsApp Business Account.
     * @param params Filtering and pagination options
     * @returns The list of Flows
     */
    list(params?: ListFlowsParams): Promise<FlowListResponse>;
    /**
     * Gets details for a single Flow.
     * @param flowId Flow ID
     * @param fields Fields to request
     * @returns The Flow details
     */
    get(flowId: string, fields?: string[]): Promise<FlowDetails>;
    /**
     * Updates a Flow's metadata (name, categories, endpoint_uri, application_id).
     * @param flowId Flow ID
     * @param updates Fields to update
     * @returns API response
     */
    updateMetadata(flowId: string, updates: UpdateFlowMetadataPayload): Promise<FlowSuccessResponse>;
    /**
     * Uploads (or replaces) a Flow's JSON definition.
     * @param flowId Flow ID
     * @param flowJson Flow JSON, either as a raw string or an already-serialized Buffer
     * @param filename Filename reported to the API (defaults to "flow.json")
     * @returns Upload result, including validation errors if the JSON is invalid
     */
    updateJson(flowId: string, flowJson: string | Buffer, filename?: string): Promise<UploadFlowJsonResponse>;
    /**
     * Publishes a Flow, making it usable in flow messages. The Flow must have valid JSON
     * uploaded first. Published Flows cannot be edited or deleted, only deprecated.
     * @param flowId Flow ID
     * @returns API response
     */
    publish(flowId: string): Promise<FlowSuccessResponse>;
    /**
     * Deprecates a published Flow so it can no longer be sent to users.
     * @param flowId Flow ID
     * @returns API response
     */
    deprecate(flowId: string): Promise<FlowSuccessResponse>;
    /**
     * Deletes a Flow. Only Flows in DRAFT status can be deleted.
     * @param flowId Flow ID
     * @returns API response
     */
    delete(flowId: string): Promise<FlowSuccessResponse>;
    /**
     * Lists the assets uploaded to a Flow (e.g. its flow.json).
     * @param flowId Flow ID
     * @returns The Flow's assets, with download URLs
     */
    getAssets(flowId: string): Promise<FlowAssetListResponse>;
    /**
     * Gets a shareable preview URL for a Flow, valid for 30 days.
     * @param flowId Flow ID
     * @param invalidate When true, invalidates the previous preview URL and issues a new one
     * @returns The preview URL and its expiry
     */
    getPreviewUrl(flowId: string, invalidate?: boolean): Promise<FlowPreviewResponse>;
}
