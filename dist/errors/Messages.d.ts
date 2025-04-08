/**
 * Custom class for WhatsApp API errors
 */
export declare class WhatsAppApiException extends Error {
    code: number;
    subcode?: number;
    details?: string;
    traceId?: string;
    constructor(message: string, code: number, subcode?: number, details?: string, traceId?: string);
}
/**
 * Mapping error codes to descriptive messages
 */
export declare const ERROR_MESSAGES: Record<number, string>;
/**
 * Gets a descriptive message for an error code
 * @param code Error code
 * @returns Descriptive message
 */
export declare function getErrorMessage(code: number): string;
