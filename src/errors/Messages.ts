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
 * ! I need someone to do this for me, not for anything special, it's a lot of work, I'm going crazy.
 */
export const ERROR_MESSAGES: Record<number, string> = {
  [WhatsAppErrorCode.ACCESS_TOKEN_INVALID]: "El token de acceso es inválido o ha expirado",
  [WhatsAppErrorCode.PERMISSION_DENIED]: "Permiso denegado para realizar esta acción",
  [WhatsAppErrorCode.AUTHENTICATION_FAILED]: "La autenticación ha fallado",
  [WhatsAppErrorCode.INVALID_PARAMETER]: "Parámetro inválido en la solicitud",
}

/**
 * Gets a descriptive message for an error code
 * @param code Error code
 * @returns Descriptive message
 */
export function getErrorMessage(code: number): string {
  return ERROR_MESSAGES[code] || `Error desconocido (código: ${code})`
}

