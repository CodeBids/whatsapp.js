import { EventEmitter } from "events"
import type { Client } from "../client/Client"
import type { WebhookHandler } from "../client/webhook/handlers/WebhookHandler"
import { EventType } from "../client/webhook/handlers/WebhookHandler"

export interface CollectorOptions {
  time?: number
  max?: number
  filter?: (message: any) => boolean
}

export interface CollectorEvents {
  collect: (message: any) => void
  end: (collected: Map<string, any>) => void
}

/**
 * Collects messages and interactions from the webhook handler
 */
export class MessageCollector extends EventEmitter {
  private handler: WebhookHandler
  private collected: Map<string, any>
  private filter: (message: any) => boolean
  private timeout: NodeJS.Timeout | null
  private max: number
  private ended: boolean
  private eventTypes: EventType[]

  /**
   * Creates a new message collector
   * @param client The client instance to collect messages from
   * @param options Collector options
   * @param eventTypes Event types to listen for (defaults to MESSAGE_RECEIVED and INTERACTION_CREATE)
   */
  constructor(
    client: Client,
    options: CollectorOptions = {},
    eventTypes: EventType[] = [EventType.MESSAGE_RECEIVED, EventType.INTERACTION_CREATE],
  ) {
    super()

    if (!client.getWebhookHandler()) {
      throw new Error("Webhook handler is not initialized. Please provide webhook options when creating the client.")
    }

    this.handler = client.getWebhookHandler()!
    this.collected = new Map()
    this.filter = options.filter || (() => true)
    this.max = options.max || Number.POSITIVE_INFINITY
    this.ended = false
    this.eventTypes = eventTypes

    // Set up event listeners
    this.eventTypes.forEach((eventType) => {
      this.handler.on(eventType, this.handleCollect.bind(this))
    })

    // Set up timeout if provided
    this.timeout = options.time ? setTimeout(() => this.stop(), options.time) : null
  }

  /**
   * Handles collecting a message
   * @param message The message to collect
   */
  private handleCollect(message: any): void {
    if (this.ended) return

    // Apply filter
    if (!this.filter(message)) return

    // Store the message
    this.collected.set(message.id, message)

    // Emit collect event
    this.emit("collect", message)

    // Check if we've reached the max
    if (this.collected.size >= this.max) {
      this.stop()
    }
  }

  /**
   * Stops the collector
   */
  public stop(): void {
    if (this.ended) return

    this.ended = true

    // Clear timeout if it exists
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }

    // Remove event listeners
    this.eventTypes.forEach((eventType) => {
      this.handler.removeListener(eventType, this.handleCollect.bind(this))
    })

    // Emit end event
    this.emit("end", this.collected)
  }

  /**
   * Returns a promise that resolves when the collector ends
   * @returns A promise that resolves with the collected messages
   */
  public async awaitMessages(): Promise<Map<string, any>> {
    return new Promise((resolve) => {
      this.on("end", (collected) => {
        resolve(collected)
      })
    })
  }

  /**
   * Returns the first message that passes the filter
   * @param client The client instance
   * @param filter Filter function
   * @param time Time to wait in ms
   * @returns A promise that resolves with the first message
   */
  public static async awaitMessage(
    client: Client,
    filter: (message: any) => boolean = () => true,
    time = 60000,
    eventTypes: EventType[] = [EventType.MESSAGE_RECEIVED, EventType.INTERACTION_CREATE],
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const collector = new MessageCollector(client, { filter, time, max: 1 }, eventTypes)

      collector.on("end", (collected) => {
        const first = collected.values().next().value
        if (first) {
          resolve(first)
        } else {
          reject(new Error("No messages were collected within the time limit"))
        }
      })
    })
  }
}