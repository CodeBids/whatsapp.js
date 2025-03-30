/**
 * Function to make requests to the WhatsApp API
 * @param url Request URL
 * @param method HTTP Method
 * @param accessToken Access token
 * @param data Body data (optional)
 * @returns Promise with response
 */
export declare function apiRequest<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", accessToken: string, data?: unknown): Promise<T>;
/**
 * Function to check if an error is of a specific type
 * @param error Error to verify
 * @param code Error code to compare
 * @returns true if the error is of the specified type
 */
export declare function isErrorCode(error: unknown, code: number): boolean;
