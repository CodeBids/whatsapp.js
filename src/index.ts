// Export the main classes
export { Client } from "./client/Client"
export { Message } from "./client/actions/Message"

// Export types
export * from "./types"

// Export WS utilites
export * from './client/webhook/handlers/WebhookHandler';

// Export error utilities
export { WhatsAppErrorCode, type WhatsAppApiError, type WhatsAppApiErrorResponse } from "./errors/ErrorCodes"
export { WhatsAppApiException, getErrorMessage } from "./errors/Messages"
export { isErrorCode } from "./services/wa-api-cloud.service"

// Export builders
export * from './models/Location'
export * from './models/Contact'
export * from './models/IncomingMessage'
export * from './models/Embed'

