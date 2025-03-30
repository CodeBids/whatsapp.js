/**
 * Function to make requests to the WhatsApp API
 * @param url Request URL
 * @param method HTTP method
 * @param accessToken Access token
 * @param data Request data (optional)
 * @returns Promise with the response
 */
export declare function apiRequest<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", accessToken: string, data?: unknown): Promise<T>;
/**
 * Function to check if an error is of a specific type
 * @param error Error to check
 * @param code Error code to compare
 * @returns true if the error is of the specified type
 */
export declare function isErrorCode(error: unknown, code: number): boolean;
