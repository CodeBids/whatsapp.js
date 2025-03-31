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
     * Makes a request to the WhatsApp API
     * @param url Request URL
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    request<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T>;
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
