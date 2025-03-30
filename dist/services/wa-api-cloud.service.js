"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = apiRequest;
exports.isErrorCode = isErrorCode;
const Messages_1 = require("../errors/Messages");
/**
 * Function to make requests to the WhatsApp API
 * @param url Request URL
 * @param method HTTP Method
 * @param accessToken Access token
 * @param data Body data (optional)
 * @returns Promise with response
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
            handleApiError(responseData);
        }
        return responseData;
    }
    catch (error) {
        if (error instanceof Messages_1.WhatsAppApiException) {
            throw error;
        }
        throw new Messages_1.WhatsAppApiException(error instanceof Error ? error.message : "Error desconocido", 0);
    }
}
/**
 * Function to handle WhatsApp API errors
 * @param errorResponse Error response
 */
function handleApiError(errorResponse) {
    if (errorResponse && errorResponse.error) {
        const apiError = errorResponse.error;
        const message = (0, Messages_1.getErrorMessage)(apiError.code);
        throw new Messages_1.WhatsAppApiException(message, apiError.code, apiError.error_subcode, apiError.error_data?.details, apiError.fbtrace_id);
    }
    throw new Messages_1.WhatsAppApiException("Error desconocido en la API de WhatsApp", 0);
}
/**
 * Function to check if an error is of a specific type
 * @param error Error to verify
 * @param code Error code to compare
 * @returns true if the error is of the specified type
 */
function isErrorCode(error, code) {
    return error instanceof Messages_1.WhatsAppApiException && error.code === code;
}
