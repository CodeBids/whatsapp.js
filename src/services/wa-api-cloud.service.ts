import type { WhatsAppApiError } from "../errors/ErrorCodes"
import { WhatsAppApiException, getErrorMessage } from "../errors/Messages"

/**
 * Function to make requests to the WhatsApp API
 * @param url Request URL
 * @param method HTTP Method
 * @param accessToken Access token
 * @param data Body data (optional)
 * @returns Promise with response
 */
export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  accessToken: string,
  data?: unknown,
): Promise<T> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    const responseData = await response.json()

    if (!response.ok) {
      handleApiError(responseData)
    }

    return responseData as T
  } catch (error) {
    if (error instanceof WhatsAppApiException) {
      throw error
    }

    throw new WhatsAppApiException(error instanceof Error ? error.message : "Error desconocido", 0)
  }
}

/**
 * Function to handle WhatsApp API errors
 * @param errorResponse Error response
 */
function handleApiError(errorResponse: any): never {
  if (errorResponse && errorResponse.error) {
    const apiError = errorResponse.error as WhatsAppApiError

    const message = getErrorMessage(apiError.code)

    throw new WhatsAppApiException(
      message,
      apiError.code,
      apiError.error_subcode,
      apiError.error_data?.details,
      apiError.fbtrace_id,
    )
  }

  throw new WhatsAppApiException("Error desconocido en la API de WhatsApp", 0)
}

/**
 * Function to check if an error is of a specific type
 * @param error Error to verify
 * @param code Error code to compare
 * @returns true if the error is of the specified type
 */
export function isErrorCode(error: unknown, code: number): boolean {
  return error instanceof WhatsAppApiException && error.code === code
}

