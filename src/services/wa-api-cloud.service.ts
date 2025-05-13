import type { WhatsAppApiError } from "../errors/ErrorCodes"
import { WhatsAppApiException, getErrorMessage } from "../errors/Messages"

/**
 * Service for making requests to the WhatsApp Cloud API
 */
export class WhatsAppApiService {
  private accessToken: string
  private version: string
  private phoneId: string

  /**
   * Creates a new WhatsApp API service
   * @param accessToken Access token for the WhatsApp API
   * @param version API version (e.g., "v22.0")
   */
  constructor(accessToken: string, version: string, phoneId: string) {
    this.accessToken = accessToken
    this.version = version
    this.phoneId = phoneId
  }

  /**
   * Gets the base API URL
   * @returns Base API URL
   */
  getApiUrl(): string {
    return `https://graph.facebook.com/${this.version}/${this.phoneId}`
  }

  /**
   * Makes a request to the WhatsApp API
   * @param url Request URL
   * @param method HTTP method
   * @param data Request data (optional)
   * @returns Promise with the response
   */
  async request<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T> {
    try {
      const response = await fetch(`${this.getApiUrl()}/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      const responseData = await response.json()

      if (!response.ok) {
        // If the response is not successful, process the error
        this.handleApiError(responseData)
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
   * Makes a request to a specific phone number
   * @param phoneId Phone number ID
   * @param endpoint API endpoint (e.g., "messages")
   * @param method HTTP method
   * @param data Request data (optional)
   * @returns Promise with the response
   */
  async phoneRequest<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T> {
    try {
      const result = await this.request<T>(endpoint, method, data)
      return result
    } catch (error) {
      console.error("Phone request failed:", error)
      throw error
    }
  }

  /**
   * Handles WhatsApp API errors
   * @param errorResponse Error response
   */
  private handleApiError(errorResponse: any): never {
    // Check if the response has the expected format
    if (errorResponse && errorResponse.error) {
      const apiError = errorResponse.error as WhatsAppApiError

      // Get the descriptive message for the error code
      const codeMessage = getErrorMessage(apiError.code)

      // Combine the API's original error message with our descriptive message
      const fullMessage = `${apiError.message} - ${codeMessage}`

      // Throw a custom exception with the error details
      throw new WhatsAppApiException(
        fullMessage,
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
   * Checks if an error is of a specific type
   * @param error Error to check
   * @param code Error code to compare
   * @returns true if the error is of the specified type
   */
  isErrorCode(error: unknown, code: number): boolean {
    return error instanceof WhatsAppApiException && error.code === code
  }
}

// Export the isErrorCode function for backward compatibility
export function isErrorCode(error: unknown, code: number): boolean {
  return error instanceof WhatsAppApiException && error.code === code
}
