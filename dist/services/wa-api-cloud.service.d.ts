import type { MediaUrlResponse, MediaDeleteResponse, MediaUploadResponse } from "../types/message";
/**
 * Service for making requests to the WhatsApp Cloud API
 */
export declare class WhatsAppApiService {
    private accessToken;
    private version;
    private phoneId;
    /**
     * Creates a new WhatsApp API service
     * @param accessToken Access token for the WhatsApp API
     * @param version API version (e.g., "v22.0")
     */
    constructor(accessToken: string, version: string, phoneId: string);
    /**
     * Gets the base API URL
     * @returns Base API URL
     */
    getApiUrl(): string;
    /**
     * Gets the phone number ID this service was configured with
     * @returns The phone number ID
     */
    getPhoneId(): string;
    /**
     * Gets the configured Graph API version
     * @returns The API version (e.g. "v25.0")
     */
    getVersion(): string;
    /**
     * Makes a request against the Graph API using a fully-qualified URL, handling
     * JSON parsing and error normalization consistently.
     * @param url Fully-qualified request URL
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    private executeRequest;
    /**
     * Makes a request to the WhatsApp API, scoped under the configured phone number ID
     * @param endpoint Endpoint relative to the phone number (e.g. "messages")
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    request<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T>;
    /**
     * Makes a request against an arbitrary Graph API path, not scoped under the phone number ID.
     * Used for WABA-level resources (message templates, flows, phone number listing) and for
     * operating on a specific node ID directly (e.g. "{FLOW_ID}/publish" or "{GROUP_ID}/invite_link").
     * @param path Path relative to the Graph API version (e.g. "{WABA_ID}/message_templates")
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    graphRequest<T>(path: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T>;
    /**
     * Uploads a Flow JSON file as an asset for a Flow.
     * @param flowId Flow ID
     * @param fileBuffer Flow JSON file content
     * @param filename Filename to report to the API (defaults to "flow.json")
     * @returns Promise with the upload result
     */
    uploadFlowJson<T>(flowId: string, fileBuffer: Buffer, filename?: string): Promise<T>;
    /**
     * Makes a request to a specific phone number
     * @param phoneId Phone number ID
     * @param endpoint API endpoint (e.g., "messages")
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    phoneRequest<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T>;
    /**
     * Uploads media to WhatsApp servers
     * @param filePath Path to the file
     * @param mimeType MIME type of the file
     * @param fileBuffer File content as Buffer
     * @returns Promise with the media ID
     */
    uploadMedia(fileBuffer: Buffer, mimeType: string, filename: string): Promise<MediaUploadResponse>;
    /**
     * Gets the URL of an uploaded media file
     * @param mediaId Media ID
     * @returns Promise with the media URL info
     */
    getMediaUrl(mediaId: string): Promise<MediaUrlResponse>;
    /**
     * Deletes an uploaded media file
     * @param mediaId Media ID
     * @returns Promise with the deletion result
     */
    deleteMedia(mediaId: string): Promise<MediaDeleteResponse>;
    /**
     * Downloads media from WhatsApp servers
     * @param mediaUrl The media URL obtained from getMediaUrl
     * @returns Promise with the media as ArrayBuffer
     */
    downloadMedia(mediaUrl: string): Promise<ArrayBuffer>;
    /**
     * Updates a group's profile picture (and optionally subject/description in the same call).
     * @param groupId Group ID
     * @param fileBuffer JPEG image content (square, max 5MB per Meta's requirements)
     * @param extraFields Additional form fields to send alongside the file (e.g. subject, description)
     * @returns Promise with the API response
     */
    updateGroupProfilePicture<T>(groupId: string, fileBuffer: Buffer, extraFields?: Record<string, string>): Promise<T>;
    /**
     * Handles WhatsApp API errors
     * @param errorResponse Error response
     */
    private handleApiError;
    /**
     * Checks if an error is of a specific type
     * @param error Error to check
     * @param code Error code to compare
     * @returns true if the error is of the specified type
     */
    isErrorCode(error: unknown, code: number): boolean;
}
export declare function isErrorCode(error: unknown, code: number): boolean;
