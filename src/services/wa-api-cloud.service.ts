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
    const url = `https://graph.facebook.com/${this.version}/${this.phoneId}`
    console.log("API URL constructed:", url)
    return url
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
      const url = `${this.getApiUrl()}/${endpoint}`
      console.log(`Making request to: ${method} ${url}`)

      const headers = {
        Authorization: `Bearer ${this.accessToken.substring(0, 4)}...`, // Solo mostrar los primeros 4 caracteres por seguridad
        "Content-Type": "application/json",
      }
      console.log("Request headers:", headers)

      if (data) {
        console.log("Request body:", JSON.stringify(data, null, 2))
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      console.log(`Response status: ${response.status} ${response.statusText}`)

      const responseData = await response.json()
      console.log("Response data:", JSON.stringify(responseData, null, 2))

      if (!response.ok) {
        // If the response is not successful, process the error
        console.error("Error response received:", responseData)
        this.handleApiError(responseData)
      }

      return responseData as T
    } catch (error) {
      // If it's already a WhatsAppApiException, propagate it
      if (error instanceof WhatsAppApiException) {
        console.error("WhatsApp API Exception:", {
          message: error.message,
          code: error.code,
          subcode: error.subcode,
          details: error.details,
          traceId: error.traceId,
        })
        throw error
      }

      // If it's another type of error, convert it to WhatsAppApiException
      console.error("Unknown error during API request:", error)
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
    console.log(`Phone request: ${method} ${endpoint || "[root]"}`)
    try {
      const result = await this.request<T>(endpoint, method, data)
      console.log("Phone request successful")
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
    console.error("Handling API error:", errorResponse)

    // Check if the response has the expected format
    if (errorResponse && errorResponse.error) {
      const apiError = errorResponse.error as WhatsAppApiError
      console.error("API error details:", {
        message: apiError.message,
        type: apiError.type,
        code: apiError.code,
        error_data: apiError.error_data,
        error_subcode: apiError.error_subcode,
        fbtrace_id: apiError.fbtrace_id,
      })

      // Get the descriptive message for the error code
      const message = getErrorMessage(apiError.code)
      console.error("Error message from code:", message)

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
    console.error("Unknown error format:", errorResponse)
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
