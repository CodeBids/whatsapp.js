"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.WhatsAppApiException = void 0;
exports.getErrorMessage = getErrorMessage;
const ErrorCodes_1 = require("./ErrorCodes");
/**
 * Custom class for WhatsApp API errors
 */
class WhatsAppApiException extends Error {
    constructor(message, code, subcode, details, traceId) {
        super(message);
        this.name = "WhatsAppApiException";
        this.code = code;
        this.subcode = subcode;
        this.details = details;
        this.traceId = traceId;
    }
}
exports.WhatsAppApiException = WhatsAppApiException;
/**
 * Mapping error codes to descriptive messages
 * ! I need someone to do this for me, not for anything special, it's a lot of work, I'm going crazy.
 */
exports.ERROR_MESSAGES = {
    [ErrorCodes_1.WhatsAppErrorCode.ACCESS_TOKEN_INVALID]: "El token de acceso es inválido o ha expirado",
    [ErrorCodes_1.WhatsAppErrorCode.PERMISSION_DENIED]: "Permiso denegado para realizar esta acción",
    [ErrorCodes_1.WhatsAppErrorCode.AUTHENTICATION_FAILED]: "La autenticación ha fallado",
    [ErrorCodes_1.WhatsAppErrorCode.INVALID_PARAMETER]: "Parámetro inválido en la solicitud",
};
/**
 * Gets a descriptive message for an error code
 * @param code Error code
 * @returns Descriptive message
 */
function getErrorMessage(code) {
    return exports.ERROR_MESSAGES[code] || `Error desconocido (código: ${code})`;
}
