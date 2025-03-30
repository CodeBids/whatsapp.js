"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = apiRequest;
exports.isErrorCode = isErrorCode;
const Messages_1 = require("../errors/Messages");
/**
 * Function to make requests to the WhatsApp API
 * @param url Request URL
 * @param method HTTP method
 * @param accessToken Access token
 * @param data Request data (optional)
 * @returns Promise with the response
 */
async function apiRequest(url, method, accessToken, data) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        });
        const responseData = await response.json();
        if (!response.ok) {
            // If the response is not successful, process the error
            handleApiError(responseData);
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
 * Function to handle WhatsApp API errors
 * @param errorResponse Error response
 */
function handleApiError(errorResponse) {
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
 * Function to check if an error is of a specific type
 * @param error Error to check
 * @param code Error code to compare
 * @returns true if the error is of the specified type
 */
function isErrorCode(error, code) {
    return error instanceof Messages_1.WhatsAppApiException && error.code === code;
}
