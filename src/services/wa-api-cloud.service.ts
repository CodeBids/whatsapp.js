import type { WhatsAppApiError } from "../errors/ErrorCodes"
import { WhatsAppApiException, getErrorMessage } from "../errors/Messages"

/**
 * Function to make requests to the WhatsApp API
 * @param url Request URL
 * @param method HTTP method
 * @param accessToken Access token
 * @param data Request data (optional)
 * @returns Promise with the response
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
      // If the response is not successful, process the error
      handleApiError(responseData)
    }

    return responseData as T
  } catch (error) {
    // If it's already a WhatsAppApiException, propagate it
    if (error instanceof WhatsAppApiException) {
      throw error
    }

    // If it's another type of error, convert it to WhatsAppApiException
    throw new WhatsAppApiException(error instanceof Error ? error.message : "Unknown error", 0)
  }
}

/**
 * Function to handle WhatsApp API errors
 * @param errorResponse Error response
 */
function handleApiError(errorResponse: any): never {
  // Check if the response has the expected format
  if (errorResponse && errorResponse.error) {
    const apiError = errorResponse.error as WhatsAppApiError

    // Get the descriptive message for the error code
    const message = getErrorMessage(apiError.code)

    // Throw a custom exception with the error details
    throw new WhatsAppApiException(
      message,
      apiError.code,
      apiError.error_subcode,
      apiError.error_data?.details,
      apiError.fbtrace_id,
    )
  }

  // If the response doesn't have the expected format, throw a generic exception
  throw new WhatsAppApiException("Unknown error in the WhatsApp API", 0)
}

/**
 * Function to check if an error is of a specific type
 * @param error Error to check
 * @param code Error code to compare
 * @returns true if the error is of the specified type
 */
export function isErrorCode(error: unknown, code: number): boolean {
  return error instanceof WhatsAppApiException && error.code === code
}

