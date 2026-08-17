import type { WhatsAppApiError } from "../errors/ErrorCodes"
import type { MediaUrlResponse, MediaDeleteResponse, MediaUploadResponse } from "../types/message"
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
   * Gets the phone number ID this service was configured with
   * @returns The phone number ID
   */
  getPhoneId(): string {
    return this.phoneId
  }

  /**
   * Gets the configured Graph API version
   * @returns The API version (e.g. "v25.0")
   */
  getVersion(): string {
    return this.version
  }

  /**
   * Makes a request against the Graph API using a fully-qualified URL, handling
   * JSON parsing and error normalization consistently.
   * @param url Fully-qualified request URL
   * @param method HTTP method
   * @param data Request data (optional)
   * @returns Promise with the response
   */
  private async executeRequest<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T> {
    try {
      const response = await fetch(url, {
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
   * Makes a request to the WhatsApp API, scoped under the configured phone number ID
   * @param endpoint Endpoint relative to the phone number (e.g. "messages")
   * @param method HTTP method
   * @param data Request data (optional)
   * @returns Promise with the response
   */
  async request<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T> {
    return this.executeRequest<T>(`${this.getApiUrl()}/${endpoint}`, method, data)
  }

  /**
   * Makes a request against an arbitrary Graph API path, not scoped under the phone number ID.
   * Used for WABA-level resources (message templates, flows, phone number listing) and for
   * operating on a specific node ID directly (e.g. "{FLOW_ID}/publish").
   * @param path Path relative to the Graph API version (e.g. "{WABA_ID}/message_templates")
   * @param method HTTP method
   * @param data Request data (optional)
   * @returns Promise with the response
   */
  async graphRequest<T>(path: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown): Promise<T> {
    return this.executeRequest<T>(`https://graph.facebook.com/${this.version}/${path}`, method, data)
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
   * Uploads media to WhatsApp servers
   * @param filePath Path to the file
   * @param mimeType MIME type of the file
   * @param fileBuffer File content as Buffer
   * @returns Promise with the media ID
   */
  async uploadMedia(fileBuffer: Buffer, mimeType: string, filename: string): Promise<MediaUploadResponse> {
    try {
      const formData = new FormData()
      formData.append("messaging_product", "whatsapp")
      formData.append("file", new Blob([fileBuffer], { type: mimeType }), filename)
      formData.append("type", mimeType)

      const response = await fetch(`${this.getApiUrl()}/media`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: formData,
      })

      const responseData = await response.json()

      if (!response.ok) {
        this.handleApiError(responseData)
      }

      return responseData as MediaUploadResponse
    } catch (error) {
      if (error instanceof WhatsAppApiException) {
        throw error
      }
      throw new WhatsAppApiException(error instanceof Error ? error.message : "Unknown error uploading media", 0)
    }
  }

  /**
   * Gets the URL of an uploaded media file
   * @param mediaId Media ID
   * @returns Promise with the media URL info
   */
  async getMediaUrl(mediaId: string): Promise<MediaUrlResponse> {
    try {
      const response = await fetch(`https://graph.facebook.com/${this.version}/${mediaId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      const responseData = await response.json()

      if (!response.ok) {
        this.handleApiError(responseData)
      }

      return responseData as MediaUrlResponse
    } catch (error) {
      if (error instanceof WhatsAppApiException) {
        throw error
      }
      throw new WhatsAppApiException(error instanceof Error ? error.message : "Unknown error getting media URL", 0)
    }
  }

  /**
   * Deletes an uploaded media file
   * @param mediaId Media ID
   * @returns Promise with the deletion result
   */
  async deleteMedia(mediaId: string): Promise<MediaDeleteResponse> {
    try {
      const response = await fetch(`https://graph.facebook.com/${this.version}/${mediaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      const responseData = await response.json()

      if (!response.ok) {
        this.handleApiError(responseData)
      }

      return responseData as MediaDeleteResponse
    } catch (error) {
      if (error instanceof WhatsAppApiException) {
        throw error
      }
      throw new WhatsAppApiException(error instanceof Error ? error.message : "Unknown error deleting media", 0)
    }
  }

  /**
   * Downloads media from WhatsApp servers
   * @param mediaUrl The media URL obtained from getMediaUrl
   * @returns Promise with the media as ArrayBuffer
   */
  async downloadMedia(mediaUrl: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(mediaUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new WhatsAppApiException(`Failed to download media: ${response.status}`, response.status)
      }

      return await response.arrayBuffer()
    } catch (error) {
      if (error instanceof WhatsAppApiException) {
        throw error
      }
      throw new WhatsAppApiException(error instanceof Error ? error.message : "Unknown error downloading media", 0)
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
