import { apiRequest } from "../../services/wa-api-cloud.service"
import { type MessageApiResponse, type MessagePayload, type MessageBodyPayload, LanguageCode } from "../../types/index"
import type { Client } from "../Client"
import { WhatsAppApiException } from "../../errors/Messages"

export class Message {
  private baseUrl: string
  private accessToken: string

  constructor(baseUrl = "", accessToken = "") {
    this.baseUrl = baseUrl
    this.accessToken = accessToken
  }

  /**
   * Sends a message through the WhatsApp API with flexible content options
   * @param payload Message payload with various content options
   * @returns API response
   */
  async send(payload: MessagePayload): Promise<MessageApiResponse> {
    // Validate the payload
    this.validatePayload(payload)

    // Determine the message type and build the body
    const body = this.buildMessageBody(payload)

    // Send the request to the API
    return await apiRequest(`${this.baseUrl}/messages`, "POST", this.accessToken, body)
  }

  /**
   * Validates the message payload
   * @param payload Message payload
   */
  private validatePayload(payload: MessagePayload): void {
    // Check if recipient is provided
    if (!payload.to) {
      throw new WhatsAppApiException("Recipient phone number is required", 0)
    }

    // Check if at least one content type is provided
    const hasContent = Boolean(
      payload.content ||
        payload.template ||
        (payload.files && payload.files.length > 0) ||
        payload.location ||
        (payload.contacts && payload.contacts.length > 0) ||
        payload.interactive ||
        payload.reaction ||
        (payload.components && payload.components.length > 0),
    )

    if (!hasContent) {
      throw new WhatsAppApiException(
        "At least one content type is required (text, template, files, location, contacts, interactive, reaction, or components)",
        0,
      )
    }

    // Validate template if provided
    if (payload.template) {
      if (!payload.template.name) {
        throw new WhatsAppApiException("Template name is required", 0)
      }

      if (!payload.template.language) {
        throw new WhatsAppApiException("Template language is required", 0)
      }

      if (!Object.values(LanguageCode).includes(payload.template.language)) {
        throw new WhatsAppApiException(
          `Invalid template language: ${payload.template.language}. Allowed languages are: ${Object.values(LanguageCode).join(", ")}.`,
          0,
        )
      }
    }

    // Validate files if provided
    if (payload.files && payload.files.length > 0) {
      for (const file of payload.files) {
        if (!file.type) {
          throw new WhatsAppApiException("File type is required", 0)
        }

        if (!file.url && !file.id) {
          throw new WhatsAppApiException("Either file URL or ID must be provided", 0)
        }
      }
    }

    // Validate location if provided
    if (payload.location) {
      if (payload.location.latitude === undefined || payload.location.longitude === undefined) {
        throw new WhatsAppApiException("Latitude and longitude are required for location messages", 0)
      }
    }

    // Validate reaction if provided
    if (payload.reaction) {
      if (!payload.reaction.message_id) {
        throw new WhatsAppApiException("Message ID is required for reaction messages", 0)
      }

      if (!payload.reaction.emoji) {
        throw new WhatsAppApiException("Emoji is required for reaction messages", 0)
      }
    }
  }

  /**
   * Builds the message body based on the provided payload
   * @param payload Message payload
   * @returns Message body for the API
   */
  private buildMessageBody(payload: MessagePayload): MessageBodyPayload {
    // Initialize the message body with common properties
    const messageBody: Partial<MessageBodyPayload> = {
      messaging_product: "whatsapp",
      to: payload.to,
    }

    // Determine the primary message type
    // Priority order for message type determination:
    // 1. Template
    // 2. Files (first file type)
    // 3. Interactive
    // 4. Location
    // 5. Contacts
    // 6. Reaction
    // 7. Text (default)

    if (payload.template) {
      messageBody.type = "template"
      messageBody.template = {
        name: payload.template.name,
        language: {
          code: payload.template.language,
        },
        components: payload.template.components,
      }
    } else if (payload.files && payload.files.length > 0) {
      const file = payload.files[0]
      messageBody.type = file.type

      // Handle different file types
      switch (file.type) {
        case "image":
          messageBody.image = {
            ...(file.id ? { id: file.id } : {}),
            ...(file.url ? { link: file.url } : {}),
            ...(file.caption ? { caption: file.caption } : {}),
          }
          break
        case "document":
          messageBody.document = {
            ...(file.id ? { id: file.id } : {}),
            ...(file.url ? { link: file.url } : {}),
            ...(file.caption ? { caption: file.caption } : {}),
            ...(file.filename ? { filename: file.filename } : {}),
          }
          break
        case "audio":
          messageBody.audio = {
            ...(file.id ? { id: file.id } : {}),
            ...(file.url ? { link: file.url } : {}),
          }
          break
        case "video":
          messageBody.video = {
            ...(file.id ? { id: file.id } : {}),
            ...(file.url ? { link: file.url } : {}),
            ...(file.caption ? { caption: file.caption } : {}),
          }
          break
        case "sticker":
          messageBody.sticker = {
            ...(file.id ? { id: file.id } : {}),
            ...(file.url ? { link: file.url } : {}),
          }
          break
      }
    } else if (payload.interactive) {
      messageBody.type = "interactive"
      messageBody.interactive = payload.interactive
    } else if (payload.location) {
      messageBody.type = "location"
      messageBody.location = {
        latitude: payload.location.latitude,
        longitude: payload.location.longitude,
        name: payload.location.name,
        address: payload.location.address,
      }
    } else if (payload.contacts && payload.contacts.length > 0) {
      messageBody.type = "contacts"
      messageBody.contacts = payload.contacts
    } else if (payload.reaction) {
      messageBody.type = "reaction"
      messageBody.reaction = payload.reaction
    } else if (payload.content) {
      messageBody.type = "text"
      messageBody.text = {
        body: payload.content,
      }
    } else {
      // If we reach here, something went wrong with validation
      throw new WhatsAppApiException("Invalid message payload", 0)
    }

    return messageBody as MessageBodyPayload
  }

  /**
   * Convenience method to send a text message
   * @param to Recipient's phone number
   * @param content Message content
   * @returns API response
   */
  async sendText(to: string, content: string): Promise<MessageApiResponse> {
    return this.send({ to, content })
  }

  /**
   * Convenience method to send a template message
   * @param to Recipient's phone number
   * @param templateName Template name
   * @param language Template language
   * @param components Template components (optional)
   * @returns API response
   */
  async sendTemplate(
    to: string,
    templateName: string,
    language: LanguageCode,
    components?: any[],
  ): Promise<MessageApiResponse> {
    return this.send({
      to,
      template: {
        name: templateName,
        language,
        components: components as any,
      },
    })
  }

  /**
   * Convenience method to send an image
   * @param to Recipient's phone number
   * @param url Image URL
   * @param caption Image caption (optional)
   * @returns API response
   */
  async sendImage(to: string, url: string, caption?: string): Promise<MessageApiResponse> {
    return this.send({
      to,
      files: [
        {
          type: "image",
          url,
          caption,
        },
      ],
    })
  }

  /**
   * Convenience method to send a document
   * @param to Recipient's phone number
   * @param url Document URL
   * @param filename Document filename
   * @param caption Document caption (optional)
   * @returns API response
   */
  async sendDocument(to: string, url: string, filename: string, caption?: string): Promise<MessageApiResponse> {
    return this.send({
      to,
      files: [
        {
          type: "document",
          url,
          filename,
          caption,
        },
      ],
    })
  }

  /**
   * Convenience method to send a video
   * @param to Recipient's phone number
   * @param url Video URL
   * @param caption Video caption (optional)
   * @returns API response
   */
  async sendVideo(to: string, url: string, caption?: string): Promise<MessageApiResponse> {
    return this.send({
      to,
      files: [
        {
          type: "video",
          url,
          caption,
        },
      ],
    })
  }

  /**
   * Convenience method to send an audio
   * @param to Recipient's phone number
   * @param url Audio URL
   * @returns API response
   */
  async sendAudio(to: string, url: string): Promise<MessageApiResponse> {
    return this.send({
      to,
      files: [
        {
          type: "audio",
          url,
        },
      ],
    })
  }

  /**
   * Convenience method to send a location
   * @param to Recipient's phone number
   * @param latitude Latitude
   * @param longitude Longitude
   * @param name Location name (optional)
   * @param address Location address (optional)
   * @returns API response
   */
  async sendLocation(
    to: string,
    latitude: number,
    longitude: number,
    name?: string,
    address?: string,
  ): Promise<MessageApiResponse> {
    return this.send({
      to,
      location: {
        latitude,
        longitude,
        name,
        address,
      },
    })
  }
}

