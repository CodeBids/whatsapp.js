import type { Client } from "../client/Client"
import type { MessageApiResponse, FileAttachment, MessagePayload } from "../types"
import { WhatsAppApiException } from "../errors/Messages"

/**
 * Represents a message received from WhatsApp
 */
export class IncomingMessage {
  // Message properties
  public id!: string
  public from!: string
  public timestamp!: string
  public type!: string
  public text?: string
  public image?: any
  public audio?: any
  public video?: any
  public document?: any
  public location?: any
  public contacts?: any[]
  public interactive?: any
  public button?: any
  public reaction?: any
  public context?: any

  // Reference to the client
  private client: Client

  constructor(data: any, client: Client) {
    this.client = client

    // Copy all properties from the data object
    Object.assign(this, data)
  }

  /**
   * Replies to the message with text
   * @param content Text content to send
   * @returns API response
   */
  async reply(payload: MessagePayload): Promise<MessageApiResponse> {
    payload.to = this.from;
    payload.context = { message_id: this.id };
    return this.client.message.send(payload)
  }

  /**
   * Reacts to the message with an emoji
   * @param emoji Emoji to react with
   * @returns API response
   */
  async react(emoji: string): Promise<MessageApiResponse> {
    if (!this.id) {
      throw new WhatsAppApiException("Cannot react to a message without an ID", 0)
    }

    if (emoji.length > 2) {
      throw new WhatsAppApiException("Cannot react with more than one emoji", 0);
    }

    return this.client.message.send({
      to: this.from,
      reaction: {
        message_id: this.id,
        emoji,
      },
    })
  }

  /**
   * Marks the message as read
   * @returns API response
   */
  async markAsRead(): Promise<any> {
    if (!this.id) {
      throw new WhatsAppApiException("Cannot mark a message as read without an ID", 0)
    }

    return this.client.makeApiRequest(`messages`, "POST", {
      messaging_product: "whatsapp",
      status: "read",
      message_id: this.id,
    })
  }

  /**
   * Forwards the message to another recipient
   * @param to Recipient's phone number
   * @returns API response
   */
  async forward(to: string): Promise<MessageApiResponse | null> {
    // Different handling based on message type
    switch (this.type) {
      case "text":
        if (this.text) {
          return this.client.message.send({
            to,
            content: this.text,
          })
        }
        break
      case "image":
        if (this.image && (this.image.id || this.image.link)) {
          return this.client.message.send({
            to,
            files: [
              {
                type: "image",
                ...(this.image.id ? { id: this.image.id } : {}),
                ...(this.image.link ? { url: this.image.link } : {}),
                caption: this.image.caption,
              },
            ],
          })
        }
        break
      case "video":
        if (this.video && (this.video.id || this.video.link)) {
          return this.client.message.send({
            to,
            files: [
              {
                type: "video",
                ...(this.video.id ? { id: this.video.id } : {}),
                ...(this.video.link ? { url: this.video.link } : {}),
                caption: this.video.caption,
              },
            ],
          })
        }
        break
      case "audio":
        if (this.audio && (this.audio.id || this.audio.link)) {
          return this.client.message.send({
            to,
            files: [
              {
                type: "audio",
                ...(this.audio.id ? { id: this.audio.id } : {}),
                ...(this.audio.link ? { url: this.audio.link } : {}),
              },
            ],
          })
        }
        break
      case "document":
        if (this.document && (this.document.id || this.document.link)) {
          return this.client.message.send({
            to,
            files: [
              {
                type: "document",
                ...(this.document.id ? { id: this.document.id } : {}),
                ...(this.document.link ? { url: this.document.link } : {}),
                caption: this.document.caption,
                filename: this.document.filename,
              },
            ],
          })
        }
        break
      case "location":
        // if (this.location) {
        //   return this.client.message.send({
        //     to,
        //     location: this.location,
        //   })
        // }
        break
      // Add more cases as needed
    }

    // If we couldn't forward the message
    throw new WhatsAppApiException(`Cannot forward message of type ${this.type}`, 0)
  }
}

