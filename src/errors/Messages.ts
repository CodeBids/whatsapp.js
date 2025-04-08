import { WhatsAppErrorCode } from "./ErrorCodes"

/**
 * Custom class for WhatsApp API errors
 */
export class WhatsAppApiException extends Error {
  code: number
  subcode?: number
  details?: string
  traceId?: string

  constructor(message: string, code: number, subcode?: number, details?: string, traceId?: string) {
    super(message)
    this.name = "WhatsAppApiException"
    this.code = code
    this.subcode = subcode
    this.details = details
    this.traceId = traceId
  }
}

/**
 * Mapping error codes to descriptive messages
 */
export const ERROR_MESSAGES: Record<number, string> = {
  // Authorization errors
  [WhatsAppErrorCode.AUTHENTICATION_FAILED]: "Unable to authenticate the app user",
  [WhatsAppErrorCode.FUNCTION_OR_PERMISSION_PROBLEM]: "Capability or permissions issue",
  [WhatsAppErrorCode.PERMISSION_DENIED]: "Permission is either not granted or has been removed",
  [WhatsAppErrorCode.ACCESS_TOKEN_INVALID]: "Access token has expired or is invalid",
  [WhatsAppErrorCode.API_PERMISSION_ISSUE]: "Permission is either not granted or has been removed",

  // Integrity errors
  [WhatsAppErrorCode.TEMPORARILY_RESTRICTED_OR_DISABLED_ACCOUNT]:
    "The WhatsApp Business Account has been restricted or disabled for violating a platform policy",
  [WhatsAppErrorCode.CAN_NOT_SEND_MESSAGE_TO_THIS_COUNTRY]:
    "Business account is restricted from messaging users in this country",
  [WhatsAppErrorCode.RESTRICTED_OR_DISABLED_ACCOUNT]: "Account has been locked or restricted for policy violations",

  // General errors
  [WhatsAppErrorCode.UNKNOWN_REQUEST]: "Invalid request or possible server error",
  [WhatsAppErrorCode.SERVER_DOWN_OR_OVERLOADED]: "Service temporarily unavailable due to downtime or being overloaded",
  [WhatsAppErrorCode.DELETED_PHONE_NUMBER]: "The business phone number has been deleted",
  [WhatsAppErrorCode.INVALID_PARAMETERS]: "The request included unsupported or misspelled parameters",
  [WhatsAppErrorCode.MESSAGE_SENT_AS_NO_EXPERIMENT]: "Message was not sent as part of an experiment",
  [WhatsAppErrorCode.COULD_NOT_SEND_MESSAGE_DUE_TO_UNKNOWN_ERROR]: "Message failed to send due to an unknown error",
  [WhatsAppErrorCode.PERMISSION_NOT_GRANTED_OR_REMOVED]: "Access denied - permission not granted or removed",
  [WhatsAppErrorCode.MISSING_REQUIRED_PARAMETER]: "Required parameter is missing from the request",
  [WhatsAppErrorCode.INVALID_PARAMETER_VALUES]: "One or more parameter values are invalid",
  [WhatsAppErrorCode.SERVICE_UNAVAILABLE]: "A service is temporarily unavailable",
  [WhatsAppErrorCode.ISSUER_AND_RECIPIENTS_ARE_SAME]: "Recipient cannot be the sender - phone numbers are the same",
  [WhatsAppErrorCode.UNABLE_TO_DELIVER_MESSAGE]: "Unable to deliver message to recipient",
  [WhatsAppErrorCode.PHONE_NUMBER_HAS_NO_APPROVED_NAME]:
    "WhatsApp provided number needs display name approval before message can be sent",
  [WhatsAppErrorCode.PAYMENT_ERROR]: "Business eligibility payment issue detected",
  [WhatsAppErrorCode.PHONE_NUMBER_REGISTRATION_ERROR]:
    "Message failed to send due to a phone number registration error",
  [WhatsAppErrorCode.WAITING_TIME_FOR_INTERACTION]:
    "Re-engagement message - more than 24 hours have passed since last reply",
  [WhatsAppErrorCode.META_DENIED_MESSAGE_DELIVERY]:
    "Meta chose not to deliver the message to maintain healthy ecosystem engagement",
  [WhatsAppErrorCode.NOT_COMPATIBLE_MESSAGE]: "Unsupported message type",
  [WhatsAppErrorCode.DOWNLOADING_MULTIMEDIA_ERROR]: "Unable to download the media sent by the user",
  [WhatsAppErrorCode.UPLOADING_MULTIMEDIA_ERROR]: "Unable to upload the media used in the message",
  [WhatsAppErrorCode.COMMERCIAL_ACCOUNT_UNDER_MAINTENANCE]: "Business Account is in maintenance mode",

  // Template errors
  [WhatsAppErrorCode.MISSING_TEMPLATE_PARAMETERS]: "Template parameter count mismatch",
  [WhatsAppErrorCode.NON_EXISTENT_OR_NOT_APPROVED_TEMPLATE]: "Template does not exist or has not been approved",
  [WhatsAppErrorCode.VERY_LONG_TRANSLATED_TEXT]: "Template hydrated text is too long",
  [WhatsAppErrorCode.CONTENT_OF_TEMPLATE_VIOLATION_TERMS]: "Template format character policy violated",
  [WhatsAppErrorCode.WRONG_PARAMETER_FORMAT]: "Template parameter format mismatch",
  [WhatsAppErrorCode.TEMPLATE_IN_PAUSE_DUE_TO_LOW_QUALITY]: "Template is paused due to low quality",
  [WhatsAppErrorCode.TEMPLATE_PERMANENTLY_DISABLED]: "Template is disabled permanently due to low quality",
  [WhatsAppErrorCode.BLOCKED_PROCESS]: "Flow is blocked",
  [WhatsAppErrorCode.LIMITED_PROCESS]: "Flow is throttled - too many messages sent using this flow",

  // Registration errors
  [WhatsAppErrorCode.FAILURE_ATTEMPT_TO_CANCEL_REGISTRATION]: "Incomplete deregistration - previous attempt failed",
  [WhatsAppErrorCode.SERVER_TEMPORARILY_UNAVAILABLE]: "Server temporarily unavailable",
  [WhatsAppErrorCode.WRONG_TWO_FACTOR_AUTHENTICATION]: "Two-step verification PIN mismatch",
  [WhatsAppErrorCode.REQUIRED_TO_VERIFY_NUMBER_AGAIN]: "Phone number re-verification needed before registering",
  [WhatsAppErrorCode.TOO_MANY_WRONG_ATTEMPTS]: "Too many two-step verification PIN guesses for this phone number",
  [WhatsAppErrorCode.PIN_ENTERED_VERY_FAST]: "Two-step verification PIN was entered too quickly",
  [WhatsAppErrorCode.UNREGISTERED_NUMBER_ON_WHATSAPP_BUSINESS]:
    "Phone number not registered on the WhatsApp Business Platform",
  [WhatsAppErrorCode.RECENTLY_REMOVED_NUMBER]:
    "Please wait a few minutes before attempting to register this phone number",
  [WhatsAppErrorCode.UNABLE_TO_SEND_MESSAGE_DUE_TO_PARAMETERS]:
    "Generic user error - unknown error with request parameters",

  // Synchronization errors
  [WhatsAppErrorCode.RATELIMIT_ON_SYNCHRONIZATION]: "Synchronization request limit exceeded",
  [WhatsAppErrorCode.SYNCHRONIZATION_NOT_AVAILABLE_AFTER_24_HOURS]:
    "Synchronization request made outside of allowed time window",

  // Rate limiting errors
  [WhatsAppErrorCode.RATELIMIT]: "API too many calls - app has reached its API call rate limit",
  [WhatsAppErrorCode.FREQUENCY_LIMIT_REACHED]:
    "Rate limit issues - WhatsApp Business Account has reached its rate limit",
  [WhatsAppErrorCode.PERFORMANCE_LIMIT_REACHED]: "Rate limit hit - Cloud API message throughput has been reached",
  [WhatsAppErrorCode.SPAM_FREQUENCY_LIMIT_REACHED]:
    "Spam rate limit hit - too many messages blocked or flagged as spam",
  [WhatsAppErrorCode.LIMIT_SENDING_TO_SAME_NUMBER]: "Too many messages sent to the same recipient in a short period",
  [WhatsAppErrorCode.LIMIT_ON_ACCOUNT_REGISTRATION]: "Account register/deregister rate limit exceeded",
}

/**
 * Gets a descriptive message for an error code
 * @param code Error code
 * @returns Descriptive message
 */
export function getErrorMessage(code: number): string {
  return ERROR_MESSAGES[code] || `Unknown error (code: ${code})`
}
