// Export the main classes
export { Client } from "./client/Client"
export { Message } from "./client/actions/Message"

// Export types
export * from "./types"

// Export error utilities
export { WhatsAppErrorCode, type WhatsAppApiError, type WhatsAppApiErrorResponse } from "./errors/ErrorCodes"
export { WhatsAppApiException, getErrorMessage } from "./errors/Messages"
export { isErrorCode } from "./services/wa-api-cloud.service"

