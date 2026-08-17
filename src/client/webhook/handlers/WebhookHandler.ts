import { EventEmitter } from "events"
import { createHmac, timingSafeEqual } from "crypto"
import type { IncomingMessage, ServerResponse } from "http"
import type { Client } from "../../Client"

/**
 * Types of events that can be emitted by the webhook handler
 */
export enum EventType {
  MESSAGE_RECEIVED = "message.received",
  MESSAGE_SENT = "message.sent",
  MESSAGE_DELIVERED = "message.delivered",
  MESSAGE_READ = "message.read",
  MESSAGE_FAILED = "message.failed",
  MESSAGE_REACTION = "message.reaction",
  STATUS_UPDATED = "status.updated",
  INTERACTION_CREATE = "interaction.create",
  /** A group was created, or a group's creation/deletion otherwise changed state (see `client.groups`) */
  GROUP_LIFECYCLE_UPDATE = "group.lifecycle_update",
  /** A participant joined, left, or was removed from a group */
  GROUP_PARTICIPANTS_UPDATE = "group.participants_update",
  /** A group's subject, description or picture changed */
  GROUP_SETTINGS_UPDATE = "group.settings_update",
  /** A group's status changed (e.g. suspended) */
  GROUP_STATUS_UPDATE = "group.status_update",
  /** Emitted for any subscribed webhook field this library doesn't parse into a more specific event (e.g. account_alerts, message_template_status_update, phone_number_quality_update). */
  WEBHOOK_EVENT = "webhook.event",
}

/**
 * Interface for webhook event data
 */
export interface WebhookEvent {
  type: EventType
  data: any
}

/** Maps group-related webhook field names to the EventType emitted for them */
const GROUP_EVENT_TYPES: Record<string, EventType> = {
  group_lifecycle_update: EventType.GROUP_LIFECYCLE_UPDATE,
  group_participants_update: EventType.GROUP_PARTICIPANTS_UPDATE,
  group_settings_update: EventType.GROUP_SETTINGS_UPDATE,
  group_status_update: EventType.GROUP_STATUS_UPDATE,
}

/**
 * Handler for WhatsApp webhook events
 */
export class WebhookHandler extends EventEmitter {
  private client: Client
  private verifyToken: string
  private appSecret?: string
  private activeCollectors: Set<any> = new Set()

  constructor(client: Client, verifyToken: string, appSecret?: string) {
    super()
    this.client = client
    this.verifyToken = verifyToken
    this.appSecret = appSecret
  }

  /**
   * Verifies the `X-Hub-Signature-256` header Meta sends with every webhook POST request,
   * proving the payload was sent by Meta and not tampered with in transit.
   * @param rawBody The raw (unparsed) request body, exactly as received
   * @param signatureHeader The value of the `X-Hub-Signature-256` request header
   * @param appSecret Your app secret, found in the App Dashboard
   * @returns true if the signature is present and matches the payload
   */
  static verifySignature(rawBody: Buffer | string, signatureHeader: string | null | undefined, appSecret: string): boolean {
    if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
      return false
    }

    const expectedSignature = createHmac("sha256", appSecret)
      .update(rawBody)
      .digest("hex")

    const providedSignature = signatureHeader.slice("sha256=".length)

    const expectedBuffer = Buffer.from(expectedSignature, "hex")
    const providedBuffer = Buffer.from(providedSignature, "hex")

    if (expectedBuffer.length !== providedBuffer.length) {
      return false
    }

    return timingSafeEqual(expectedBuffer, providedBuffer)
  }

  /**
   * Registers an active collector
   * @param collector The collector to register
   */
  public registerCollector(collector: any): void {
    this.activeCollectors.add(collector)
  }

  /**
   * Unregisters an active collector
   * @param collector The collector to unregister
   */
  public unregisterCollector(collector: any): void {
    this.activeCollectors.delete(collector)
  }

  /**
   * Handles incoming webhook requests
   * @param req Incoming HTTP request
   * @param res HTTP response
   */
  async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const method = req.method

    if (method === "GET") {
      // Handle verification request
      this.handleVerification(req, res)
    } else if (method === "POST") {
      // Handle webhook event
      await this.handleWebhookEvent(req, res)
    } else {
      // Method not allowed
      res.writeHead(405, { "Content-Type": "text/plain" })
      res.end("Method Not Allowed")
    }
  }

  /**
   * Handles webhook verification request
   * @param req Incoming HTTP request
   * @param res HTTP response
   */
  private handleVerification(req: IncomingMessage, res: ServerResponse): void {
    const url = new URL(req.url || "", `http://${req.headers.host}`)
    const mode = url.searchParams.get("hub.mode")
    const token = url.searchParams.get("hub.verify_token")
    const challenge = url.searchParams.get("hub.challenge")

    if (mode === "subscribe" && token === this.verifyToken && challenge) {
      // Verification successful
      res.writeHead(200, { "Content-Type": "text/plain" })
      res.end(challenge)
    } else {
      // Verification failed
      res.writeHead(403, { "Content-Type": "text/plain" })
      res.end("Verification Failed")
    }
  }

  /**
   * Handles incoming webhook events
   * @param req Incoming HTTP request
   * @param res HTTP response
   */
  private async handleWebhookEvent(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const chunks: Buffer[] = []

    // Collect the raw request body (kept as a Buffer so signature validation hashes the exact bytes Meta sent)
    req.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    })

    // Process the event when the request is complete
    req.on("end", () => {
      const rawBody = Buffer.concat(chunks)

      // Validate the payload signature when an app secret was configured
      if (this.appSecret) {
        const signature = req.headers["x-hub-signature-256"]
        const signatureHeader = Array.isArray(signature) ? signature[0] : signature

        if (!WebhookHandler.verifySignature(rawBody, signatureHeader, this.appSecret)) {
          console.error("Webhook signature validation failed. Rejecting request.")
          res.writeHead(401, { "Content-Type": "text/plain" })
          res.end("Invalid signature")
          return
        }
      }

      try {
        const data = JSON.parse(rawBody.toString("utf-8"))

        // Acknowledge receipt of the event
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("EVENT_RECEIVED")

        // Process the event
        this.processEvent(data)
      } catch (error) {
        console.error("Error processing webhook event:", error)
        res.writeHead(400, { "Content-Type": "text/plain" })
        res.end("Bad Request")
      }
    })
  }

  /**
   * Processes a webhook event and emits the appropriate event
   * @param data Webhook event data
   */
  private processEvent(data: any): void {
    // Check if this is a valid WhatsApp webhook event
    if (!data.object || data.object !== "whatsapp_business_account") {
      return
    }

    // Process each entry in the webhook event
    for (const entry of data.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field in GROUP_EVENT_TYPES) {
          this.emit(GROUP_EVENT_TYPES[change.field], change.value)
          continue
        }

        if (change.field !== "messages") {
          // Fields this library doesn't parse into a dedicated event (account_alerts,
          // message_template_status_update, phone_number_quality_update, etc.) are still
          // surfaced, unparsed, so consumers can react to them if they subscribed to the field.
          this.emit(EventType.WEBHOOK_EVENT, { field: change.field, value: change.value })
          continue
        }

        const value = change.value

        // Process messages
        if (value.messages && value.messages.length > 0) {
          for (const message of value.messages) {
            // Prepare event data
            let eventData
            let eventType

            // Check if this is an interactive message
            if (message.type === "interactive") {
              eventData = {
                id: message.id,
                from: message.from,
                timestamp: message.timestamp,
                type: message.interactive.type,
                interactive: message.interactive,
                context: message.context,
              }
              eventType = EventType.INTERACTION_CREATE
            } else {
              // Process regular messages
              eventData = {
                id: message.id,
                from: message.from,
                timestamp: message.timestamp,
                type: message.type,
                context: message.context,
                ...this.extractMessageContent(message),
              }
              eventType = EventType.MESSAGE_RECEIVED
            }

            // Check if any collector should handle this message exclusively
            let shouldPreventDefault = false
            for (const collector of this.activeCollectors) {
              if (collector.eventTypes.includes(eventType) && collector.handleCollect(eventData)) {
                shouldPreventDefault = true
                break
              }
            }

            // Only emit the event if no collector prevented the default behavior
            if (!shouldPreventDefault) {
              this.emit(eventType, eventData)
            }
          }
        }

        // Rest of the code remains the same
        // Process delivery status updates
        if (value.statuses && value.statuses.length > 0) {
          for (const status of value.statuses) {
            if (status.status === "sent") {
              this.emit(EventType.MESSAGE_SENT, {
                id: status.id,
                recipient_id: status.recipient_id,
                timestamp: status.timestamp,
              })
            } else if (status.status === "delivered") {
              this.emit(EventType.MESSAGE_DELIVERED, {
                id: status.id,
                recipient_id: status.recipient_id,
                timestamp: status.timestamp,
              })
            } else if (status.status === "read") {
              this.emit(EventType.MESSAGE_READ, {
                id: status.id,
                recipient_id: status.recipient_id,
                timestamp: status.timestamp,
              })
            } else if (status.status === "failed") {
              this.emit(EventType.MESSAGE_FAILED, {
                id: status.id,
                recipient_id: status.recipient_id,
                timestamp: status.timestamp,
                errors: status.errors,
              })
            } else {
              this.emit(EventType.STATUS_UPDATED, status)
            }
          }
        }

        // Process reactions
        if (value.reactions && value.reactions.length > 0) {
          for (const reaction of value.reactions) {
            this.emit(EventType.MESSAGE_REACTION, {
              message_id: reaction.message_id,
              from: reaction.from,
              emoji: reaction.emoji,
              timestamp: reaction.timestamp,
            })
          }
        }
      }
    }
  }

  /**
   * Extracts the content from a message based on its type
   * @param message Message object
   * @returns Extracted content
   */
  private extractMessageContent(message: any): any {
    const content: any = {}

    // Extract content based on message type
    switch (message.type) {
      case "text":
        content.text = message.text.body
        break
      case "image":
        content.image = message.image
        break
      case "audio":
        content.audio = message.audio
        break
      case "video":
        content.video = message.video
        break
      case "document":
        content.document = message.document
        break
      case "sticker":
        content.sticker = message.sticker
        break
      case "location":
        content.location = message.location
        break
      case "contacts":
        content.contacts = message.contacts
        break
      case "interactive":
        content.interactive = message.interactive
        break
      case "button":
        content.button = message.button
        break
      case "reaction":
        content.reaction = message.reaction
        break
      case "sticker":
        content.sticker = message.sticker
        break
      case "order":
        content.order = message.order
        break
    }

    return content
  }

  /**
   * Starts a simple HTTP server to listen for webhook events
   * @param port Port to listen on
   * @param callback Callback function called when the server starts
   * @returns HTTP server instance
   */
  startServer(port: number, callback?: () => void): any {
    const http = require("http")

    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      this.handleRequest(req, res).catch((error) => {
        console.error("Error handling webhook request:", error)
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("Internal Server Error")
      })
    })

    server.listen(port, () => {
      if (callback) callback()
    })

    return server
  }
}
