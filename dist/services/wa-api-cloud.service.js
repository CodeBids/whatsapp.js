"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppApiService = void 0;
exports.isErrorCode = isErrorCode;
const Messages_1 = require("../errors/Messages");
/**
 * Service for making requests to the WhatsApp Cloud API
 */
class WhatsAppApiService {
    /**
     * Creates a new WhatsApp API service
     * @param accessToken Access token for the WhatsApp API
     * @param version API version (e.g., "v22.0")
     */
    constructor(accessToken, version, phoneId) {
        this.accessToken = accessToken;
        this.version = version;
        this.phoneId = phoneId;
    }
    /**
     * Gets the base API URL
     * @returns Base API URL
     */
    getApiUrl() {
        return `https://graph.facebook.com/${this.version}/${this.phoneId}`;
    }
    /**
     * Makes a request to the WhatsApp API
     * @param url Request URL
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    async request(endpoint, method, data) {
        try {
            const response = await fetch(`${this.getApiUrl()}/${endpoint}`, {
                method,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : undefined,
            });
            const responseData = await response.json();
            if (!response.ok) {
                // If the response is not successful, process the error
                this.handleApiError(responseData);
            }
            return responseData;
        }
        catch (error) {
            // If it's already a WhatsAppApiException, propagate it
            if (error instanceof Messages_1.WhatsAppApiException) {
                throw error;
            }
            // If it's another type of error, convert it to WhatsAppApiException
            throw new Messages_1.WhatsAppApiException(error instanceof Error ? error.message : "Unknown error", 0);
        }
    }
    /**
     * Makes a request to a specific phone number
     * @param phoneId Phone number ID
     * @param endpoint API endpoint (e.g., "messages")
     * @param method HTTP method
     * @param data Request data (optional)
     * @returns Promise with the response
     */
    async phoneRequest(endpoint, method, data) {
        return this.request(endpoint, method, data);
    }
    /**
     * Handles WhatsApp API errors
     * @param errorResponse Error response
     */
    handleApiError(errorResponse) {
        // Check if the response has the expected format
        if (errorResponse && errorResponse.error) {
            const apiError = errorResponse.error;
            // Get the descriptive message for the error code
            const message = (0, Messages_1.getErrorMessage)(apiError.code);
            // Throw a custom exception with the error details
            throw new Messages_1.WhatsAppApiException(message, apiError.code, apiError.error_subcode, apiError.error_data?.details, apiError.fbtrace_id);
        }
        // If the response doesn't have the expected format, throw a generic exception
        throw new Messages_1.WhatsAppApiException("Unknown error in the WhatsApp API", 0);
    }
    /**
     * Checks if an error is of a specific type
     * @param error Error to check
     * @param code Error code to compare
     * @returns true if the error is of the specified type
     */
    isErrorCode(error, code) {
        return error instanceof Messages_1.WhatsAppApiException && error.code === code;
    }
}
exports.WhatsAppApiService = WhatsAppApiService;
// Export the isErrorCode function for backward compatibility
function isErrorCode(error, code) {
    return error instanceof Messages_1.WhatsAppApiException && error.code === code;
}
