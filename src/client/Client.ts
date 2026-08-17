import { EventEmitter } from "events"
import { Message } from "./actions/Message"
import { ConversationalAutomationManager } from "./actions/ConversationalAutomation"
import { QrCodeManager } from "./actions/QrCodes"
import { BlockedUsersManager } from "./actions/BlockedUsers"
import { IncomingMessage } from "../models/IncomingMessage"
import { WhatsAppApiService } from "../services/wa-api-cloud.service"
import type { ClientData, ClientInfoResponse, ClientOptions, BusinessProfileUpdate, MediaUploadResponse, MediaUrlResponse, MediaDeleteResponse } from "../types"
import { WebhookHandler, EventType } from "./webhook/handlers/WebhookHandler"

/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
export class Client extends EventEmitter {
  private apiService: WhatsAppApiService
  private _webhook: WebhookHandler | null = null
  private _webhookServer: any = null

  public name: string | null = null
  public quality: string | null = null
  public id: string | null = null
  public displayPhoneNumber: string | null = null

  public message: Message
  public conversationalAutomation: ConversationalAutomationManager
  public qrCodes: QrCodeManager
  public blockedUsers: BlockedUsersManager

  constructor(options: ClientOptions) {
    super()

    const { phoneId, accessToken, webhook } = options

    if (!phoneId || !accessToken) {
      throw new Error("Phone ID and Access Token are required")
    }

    if (!/^\d+$/.test(phoneId)) {
      console.error("Invalid Phone ID format:", phoneId)
      throw new Error("Phone ID must be a numeric string")
    }

    if (!/^[A-Za-z0-9]+$/.test(accessToken)) {
      console.error("Invalid Access Token format")
      throw new Error("Access Token must be alphanumeric")
    }

    this.apiService = new WhatsAppApiService(accessToken, "v25.0", phoneId)

    this.message = new Message(this)
    this.conversationalAutomation = new ConversationalAutomationManager(this)
    this.qrCodes = new QrCodeManager(this)
    this.blockedUsers = new BlockedUsersManager(this)

    // Initialize webhook if options are provided
    if (webhook && webhook.verifyToken) {
      this._setupWebhook(webhook.verifyToken, webhook.appSecret)

      // Start webhook server automatically if autoStart is true or not specified
      if (webhook.autoStart !== false && webhook.port) {
        this._startWebhookServer(webhook.port)
      }
    }

    // Initialize client data and emit 'ready' event when done
    this.initializeClientData()
      .then(() => {
        this.emit("ready", {
          name: this.name,
          quality: this.quality,
          id: this.id,
          displayPhoneNumber: this.displayPhoneNumber,
        })
      })
      .catch((error) => {
        console.error("Error initializing client data:", error)
      })
  }

  /**
   * Gets the API service
   * @returns WhatsApp API service
   * @internal
   */
  getApiService(): WhatsAppApiService {
    return this.apiService
  }

  /**
   * Sets up a webhook handler for receiving events
   * @param verifyToken Token used to verify webhook requests
   * @param appSecret Optional app secret used to validate the `X-Hub-Signature-256` header on incoming requests
   * @private
   */
  _setupWebhook(verifyToken: string, appSecret?: string): void {
    this._webhook = new WebhookHandler(this, verifyToken, appSecret)

    // Forward all webhook events to the client
    Object.values(EventType).forEach((eventType) => {
      this._webhook!.on(eventType, (data) => {
        // For message received events, convert to IncomingMessage
        if (eventType === EventType.MESSAGE_RECEIVED) {
          const message = new IncomingMessage(data, this)
          this.emit(eventType, message)
        } else {
          this.emit(eventType, data)
        }
      })
    })
  }

  /**
   * Starts a webhook server to listen for events
   * @param port Port to listen on
   * @param callback Callback function called when the server starts
   * @returns HTTP server instance
   * @private
   */
  _startWebhookServer(port: number, callback?: () => void): any {
    if (!this._webhook) {
      throw new Error("Webhook handler not initialized. Please provide webhook options when creating the client.")
    }

    this._webhookServer = this._webhook.startServer(port, callback)
    return this._webhookServer
  }

  /**
   * Starts the webhook server if it's not already running
   * @param port Port to listen on
   * @param callback Callback function called when the server starts
   * @returns HTTP server instance
   */
  public startServer(port: number, callback?: () => void): any {
    if (!this._webhook) {
      throw new Error("Webhook handler not initialized. Please provide webhook options when creating the client.")
    }

    if (this._webhookServer) {
      console.warn("Webhook server is already running.")
      return this._webhookServer
    }

    return this._startWebhookServer(port, callback)
  }

  /**
   * Stops the webhook server if it's running
   * @param callback Callback function called when the server stops
   */
  public stopServer(callback?: () => void): void {
    if (this._webhookServer) {
      this._webhookServer.close(() => {
        this._webhookServer = null
        if (callback) callback()
      })
    } else {
      if (callback) callback()
    }
  }

  /**
   * Makes a direct API request
   * @param url API URL
   * @param method HTTP method
   * @param data Request data
   * @returns API response
   * @internal
   */
  async makeApiRequest<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any): Promise<T> {
    return this.apiService.request<T>(url, method, data)
  }

  /**
   * Makes a request to the phone endpoint
   * @param endpoint API endpoint
   * @param method HTTP method
   * @param data Request data
   * @returns API response
   * @internal
   */
  async makePhoneRequest<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any): Promise<T> {
    return this.apiService.phoneRequest<T>(endpoint, method, data)
  }

  private async initializeClientData(): Promise<void> {
    try {
      const data = await this.makePhoneRequest<ClientData>(
        "?fields=verified_name,code_verification_status,display_phone_number,quality_rating,platform_type,throughput,id",
        "GET"
      )
      this.name = data.verified_name
      this.quality = data.quality_rating
      this.id = data.id
      this.displayPhoneNumber = data.display_phone_number
    } catch (error) {
      console.error("Error initializing client data:", error)
      throw error
    }
  }

  /**
   * Gets the webhook handler
   * @returns The webhook handler or null if not initialized
   * @internal
   */
  getWebhookHandler(): WebhookHandler | null {
    return this._webhook
  }

  /**
   * Creates a message collector
   * @param options Collector options
   * @param eventTypes Event types to listen for
   * @returns A new message collector
   */
  createMessageCollector(
    options: import("../utils/MessageCollector").CollectorOptions = {},
    eventTypes: EventType[] = [EventType.MESSAGE_RECEIVED, EventType.INTERACTION_CREATE],
  ): import("../utils/MessageCollector").MessageCollector {
    const { MessageCollector } = require("../utils/MessageCollector")
    return new MessageCollector(this, options, eventTypes)
  }

  /**
   * Waits for a single message that passes the filter
   * @param filter Filter function
   * @param time Time to wait in ms
   * @param eventTypes Event types to listen for
   * @returns A promise that resolves with the first message
   */
  awaitMessage(
    filter: (message: any) => boolean = () => true,
    time = 60000,
    eventTypes: EventType[] = [EventType.MESSAGE_RECEIVED, EventType.INTERACTION_CREATE],
  ): Promise<any> {
    const { MessageCollector } = require("../utils/MessageCollector")
    return MessageCollector.awaitMessage(this, filter, time, eventTypes)
  }

  public async getBusinessProfile(): Promise<ClientInfoResponse> {
    const url = `whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`
    return await this.makeApiRequest<ClientInfoResponse>(url, "GET")
  }

  /**
   * Updates the business profile
   * @param profile Business profile fields to update
   * @returns API response
   */
  public async updateBusinessProfile(profile: BusinessProfileUpdate): Promise<any> {
    return await this.makeApiRequest("whatsapp_business_profile", "POST", {
      messaging_product: "whatsapp",
      ...profile,
    })
  }

  /**
   * Sends a typing indicator to the user
   * @param messageId The ID of the last message received from the user
   * @returns API response
   */
  public async sendTypingIndicator(messageId: string): Promise<any> {
    return await this.makeApiRequest("messages", "POST", {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
      typing_indicator: {
        type: "text",
      },
    })
  }

  /**
   * Marks a message as read (shows blue check marks)
   * @param messageId The ID of the message to mark as read
   * @returns API response
   */
  public async markAsRead(messageId: string): Promise<any> {
    return await this.makeApiRequest("messages", "POST", {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    })
  }

  /**
   * Uploads media to WhatsApp servers
   * @param fileBuffer File content as Buffer
   * @param mimeType MIME type of the file (e.g., "image/jpeg", "video/mp4")
   * @param filename Filename for the upload
   * @returns Promise with the media ID
   */
  public async uploadMedia(fileBuffer: Buffer, mimeType: string, filename: string): Promise<MediaUploadResponse> {
    return this.apiService.uploadMedia(fileBuffer, mimeType, filename)
  }

  /**
   * Gets the URL of an uploaded media file
   * @param mediaId Media ID
   * @returns Promise with the media URL information
   */
  public async getMediaUrl(mediaId: string): Promise<MediaUrlResponse> {
    return this.apiService.getMediaUrl(mediaId)
  }

  /**
   * Deletes an uploaded media file
   * @param mediaId Media ID
   * @returns Promise with the deletion result
   */
  public async deleteMedia(mediaId: string): Promise<MediaDeleteResponse> {
    return this.apiService.deleteMedia(mediaId)
  }

  /**
   * Downloads media from WhatsApp servers
   * @param mediaUrl The media URL obtained from getMediaUrl
   * @returns Promise with the media as ArrayBuffer
   */
  public async downloadMedia(mediaUrl: string): Promise<ArrayBuffer> {
    return this.apiService.downloadMedia(mediaUrl)
  }

  /**
   * Downloads media by its ID (convenience method)
   * @param mediaId Media ID
   * @returns Promise with the media as ArrayBuffer
   */
  public async downloadMediaById(mediaId: string): Promise<ArrayBuffer> {
    const mediaInfo = await this.getMediaUrl(mediaId)
    return this.downloadMedia(mediaInfo.url)
  }
}
