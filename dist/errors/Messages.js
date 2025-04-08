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
 */
exports.ERROR_MESSAGES = {
    // Authorization errors
    [ErrorCodes_1.WhatsAppErrorCode.AUTHENTICATION_FAILED]: "Unable to authenticate the app user",
    [ErrorCodes_1.WhatsAppErrorCode.FUNCTION_OR_PERMISSION_PROBLEM]: "Capability or permissions issue",
    [ErrorCodes_1.WhatsAppErrorCode.PERMISSION_DENIED]: "Permission is either not granted or has been removed",
    [ErrorCodes_1.WhatsAppErrorCode.ACCESS_TOKEN_INVALID]: "Access token has expired or is invalid",
    [ErrorCodes_1.WhatsAppErrorCode.API_PERMISSION_ISSUE]: "Permission is either not granted or has been removed",
    // Integrity errors
    [ErrorCodes_1.WhatsAppErrorCode.TEMPORARILY_RESTRICTED_OR_DISABLED_ACCOUNT]: "The WhatsApp Business Account has been restricted or disabled for violating a platform policy",
    [ErrorCodes_1.WhatsAppErrorCode.CAN_NOT_SEND_MESSAGE_TO_THIS_COUNTRY]: "Business account is restricted from messaging users in this country",
    [ErrorCodes_1.WhatsAppErrorCode.RESTRICTED_OR_DISABLED_ACCOUNT]: "Account has been locked or restricted for policy violations",
    // General errors
    [ErrorCodes_1.WhatsAppErrorCode.UNKNOWN_REQUEST]: "Invalid request or possible server error",
    [ErrorCodes_1.WhatsAppErrorCode.SERVER_DOWN_OR_OVERLOADED]: "Service temporarily unavailable due to downtime or being overloaded",
    [ErrorCodes_1.WhatsAppErrorCode.DELETED_PHONE_NUMBER]: "The business phone number has been deleted",
    [ErrorCodes_1.WhatsAppErrorCode.INVALID_PARAMETERS]: "The request included unsupported or misspelled parameters",
    [ErrorCodes_1.WhatsAppErrorCode.MESSAGE_SENT_AS_NO_EXPERIMENT]: "Message was not sent as part of an experiment",
    [ErrorCodes_1.WhatsAppErrorCode.COULD_NOT_SEND_MESSAGE_DUE_TO_UNKNOWN_ERROR]: "Message failed to send due to an unknown error",
    [ErrorCodes_1.WhatsAppErrorCode.PERMISSION_NOT_GRANTED_OR_REMOVED]: "Access denied - permission not granted or removed",
    [ErrorCodes_1.WhatsAppErrorCode.MISSING_REQUIRED_PARAMETER]: "Required parameter is missing from the request",
    [ErrorCodes_1.WhatsAppErrorCode.INVALID_PARAMETER_VALUES]: "One or more parameter values are invalid",
    [ErrorCodes_1.WhatsAppErrorCode.SERVICE_UNAVAILABLE]: "A service is temporarily unavailable",
    [ErrorCodes_1.WhatsAppErrorCode.ISSUER_AND_RECIPIENTS_ARE_SAME]: "Recipient cannot be the sender - phone numbers are the same",
    [ErrorCodes_1.WhatsAppErrorCode.UNABLE_TO_DELIVER_MESSAGE]: "Unable to deliver message to recipient",
    [ErrorCodes_1.WhatsAppErrorCode.PHONE_NUMBER_HAS_NO_APPROVED_NAME]: "WhatsApp provided number needs display name approval before message can be sent",
    [ErrorCodes_1.WhatsAppErrorCode.PAYMENT_ERROR]: "Business eligibility payment issue detected",
    [ErrorCodes_1.WhatsAppErrorCode.PHONE_NUMBER_REGISTRATION_ERROR]: "Message failed to send due to a phone number registration error",
    [ErrorCodes_1.WhatsAppErrorCode.WAITING_TIME_FOR_INTERACTION]: "Re-engagement message - more than 24 hours have passed since last reply",
    [ErrorCodes_1.WhatsAppErrorCode.META_DENIED_MESSAGE_DELIVERY]: "Meta chose not to deliver the message to maintain healthy ecosystem engagement",
    [ErrorCodes_1.WhatsAppErrorCode.NOT_COMPATIBLE_MESSAGE]: "Unsupported message type",
    [ErrorCodes_1.WhatsAppErrorCode.DOWNLOADING_MULTIMEDIA_ERROR]: "Unable to download the media sent by the user",
    [ErrorCodes_1.WhatsAppErrorCode.UPLOADING_MULTIMEDIA_ERROR]: "Unable to upload the media used in the message",
    [ErrorCodes_1.WhatsAppErrorCode.COMMERCIAL_ACCOUNT_UNDER_MAINTENANCE]: "Business Account is in maintenance mode",
    // Template errors
    [ErrorCodes_1.WhatsAppErrorCode.MISSING_TEMPLATE_PARAMETERS]: "Template parameter count mismatch",
    [ErrorCodes_1.WhatsAppErrorCode.NON_EXISTENT_OR_NOT_APPROVED_TEMPLATE]: "Template does not exist or has not been approved",
    [ErrorCodes_1.WhatsAppErrorCode.VERY_LONG_TRANSLATED_TEXT]: "Template hydrated text is too long",
    [ErrorCodes_1.WhatsAppErrorCode.CONTENT_OF_TEMPLATE_VIOLATION_TERMS]: "Template format character policy violated",
    [ErrorCodes_1.WhatsAppErrorCode.WRONG_PARAMETER_FORMAT]: "Template parameter format mismatch",
    [ErrorCodes_1.WhatsAppErrorCode.TEMPLATE_IN_PAUSE_DUE_TO_LOW_QUALITY]: "Template is paused due to low quality",
    [ErrorCodes_1.WhatsAppErrorCode.TEMPLATE_PERMANENTLY_DISABLED]: "Template is disabled permanently due to low quality",
    [ErrorCodes_1.WhatsAppErrorCode.BLOCKED_PROCESS]: "Flow is blocked",
    [ErrorCodes_1.WhatsAppErrorCode.LIMITED_PROCESS]: "Flow is throttled - too many messages sent using this flow",
    // Registration errors
    [ErrorCodes_1.WhatsAppErrorCode.FAILURE_ATTEMPT_TO_CANCEL_REGISTRATION]: "Incomplete deregistration - previous attempt failed",
    [ErrorCodes_1.WhatsAppErrorCode.SERVER_TEMPORARILY_UNAVAILABLE]: "Server temporarily unavailable",
    [ErrorCodes_1.WhatsAppErrorCode.WRONG_TWO_FACTOR_AUTHENTICATION]: "Two-step verification PIN mismatch",
    [ErrorCodes_1.WhatsAppErrorCode.REQUIRED_TO_VERIFY_NUMBER_AGAIN]: "Phone number re-verification needed before registering",
    [ErrorCodes_1.WhatsAppErrorCode.TOO_MANY_WRONG_ATTEMPTS]: "Too many two-step verification PIN guesses for this phone number",
    [ErrorCodes_1.WhatsAppErrorCode.PIN_ENTERED_VERY_FAST]: "Two-step verification PIN was entered too quickly",
    [ErrorCodes_1.WhatsAppErrorCode.UNREGISTERED_NUMBER_ON_WHATSAPP_BUSINESS]: "Phone number not registered on the WhatsApp Business Platform",
    [ErrorCodes_1.WhatsAppErrorCode.RECENTLY_REMOVED_NUMBER]: "Please wait a few minutes before attempting to register this phone number",
    [ErrorCodes_1.WhatsAppErrorCode.UNABLE_TO_SEND_MESSAGE_DUE_TO_PARAMETERS]: "Generic user error - unknown error with request parameters",
    // Synchronization errors
    [ErrorCodes_1.WhatsAppErrorCode.RATELIMIT_ON_SYNCHRONIZATION]: "Synchronization request limit exceeded",
    [ErrorCodes_1.WhatsAppErrorCode.SYNCHRONIZATION_NOT_AVAILABLE_AFTER_24_HOURS]: "Synchronization request made outside of allowed time window",
    // Rate limiting errors
    [ErrorCodes_1.WhatsAppErrorCode.RATELIMIT]: "API too many calls - app has reached its API call rate limit",
    [ErrorCodes_1.WhatsAppErrorCode.FREQUENCY_LIMIT_REACHED]: "Rate limit issues - WhatsApp Business Account has reached its rate limit",
    [ErrorCodes_1.WhatsAppErrorCode.PERFORMANCE_LIMIT_REACHED]: "Rate limit hit - Cloud API message throughput has been reached",
    [ErrorCodes_1.WhatsAppErrorCode.SPAM_FREQUENCY_LIMIT_REACHED]: "Spam rate limit hit - too many messages blocked or flagged as spam",
    [ErrorCodes_1.WhatsAppErrorCode.LIMIT_SENDING_TO_SAME_NUMBER]: "Too many messages sent to the same recipient in a short period",
    [ErrorCodes_1.WhatsAppErrorCode.LIMIT_ON_ACCOUNT_REGISTRATION]: "Account register/deregister rate limit exceeded",
};
/**
 * Gets a descriptive message for an error code
 * @param code Error code
 * @returns Descriptive message
 */
function getErrorMessage(code) {
    return exports.ERROR_MESSAGES[code] || `Unknown error (code: ${code})`;
}
