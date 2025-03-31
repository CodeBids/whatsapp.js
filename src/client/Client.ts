import { EventEmitter } from "events";
import { Message } from "./actions/Message";
import { IncomingMessage } from "../models/IncomingMessage"
import { WhatsAppApiService } from "../services/wa-api-cloud.service";
import type { ClientData, ClientInfoResponse, ClientOptions } from "../types";
import { WebhookHandler, EventType } from "./webhook/handlers/WebhookHandler";

/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
export class Client extends EventEmitter {
  private apiService: WhatsAppApiService;
  private _webhook: WebhookHandler | null = null;
  private _webhookServer: any = null;

  public name: string | null = null;
  public quality: string | null = null;
  public id: string | null = null;
  public displayPhoneNumber: string | null = null;

  public message: Message;

  constructor(options: ClientOptions) {
    super();

    const { phoneId, accessToken, version, webhook } = options;

    if (!phoneId || !accessToken || !version) {
      throw new Error("Phone ID, Access Token and Version are required");
    }

    if (!/^\d+$/.test(phoneId)) {
      throw new Error("Phone ID must be a numeric string");
    }

    if (!/^[A-Za-z0-9]+$/.test(accessToken)) {
      throw new Error("Access Token must be alphanumeric");
    }

    if (version !== "v22.0") {
      throw new Error("Version must be v22.0");
    }

    this.apiService = new WhatsAppApiService(accessToken, version, phoneId);

    this.message = new Message(this);

    this.initializeClientData().catch((error) => {
      console.error("Error initializing client data:", error);
    });

    // Initialize webhook if options are provided
    if (webhook && webhook.verifyToken) {
      this._setupWebhook(webhook.verifyToken);

      // Start webhook server automatically if autoStart is true or not specified
      if (webhook.autoStart !== false && webhook.port) {
        this._startWebhookServer(webhook.port);
      }
    }
  }

  /**
   * Gets the API service
   * @returns WhatsApp API service
   * @internal
   */
  getApiService(): WhatsAppApiService {
    return this.apiService;
  }

  /**
   * Sets up a webhook handler for receiving events
   * @param verifyToken Token used to verify webhook requests
   * @private
   */
  _setupWebhook(verifyToken: string): void {
    this._webhook = new WebhookHandler(this, verifyToken);

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
      });
    });
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
      throw new Error(
        "Webhook handler not initialized. Please provide webhook options when creating the client."
      );
    }

    this._webhookServer = this._webhook.startServer(port, callback);
    return this._webhookServer;
  }

  /**
   * Starts the webhook server if it's not already running
   * @param port Port to listen on
   * @param callback Callback function called when the server starts
   * @returns HTTP server instance
   */
  public startServer(port: number, callback?: () => void): any {
    if (!this._webhook) {
      throw new Error(
        "Webhook handler not initialized. Please provide webhook options when creating the client."
      );
    }

    if (this._webhookServer) {
      console.warn("Webhook server is already running.");
      return this._webhookServer;
    }

    return this._startWebhookServer(port, callback);
  }

  /**
   * Stops the webhook server if it's running
   * @param callback Callback function called when the server stops
   */
  public stopServer(callback?: () => void): void {
    if (this._webhookServer) {
      this._webhookServer.close(() => {
        this._webhookServer = null;
        if (callback) callback();
      });
    } else {
      if (callback) callback();
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
    return await this.makePhoneRequest<ClientData>("", "GET").then((data) => {
      this.name = data.verified_name
      this.quality = data.quality_rating
      this.id = data.id
      this.displayPhoneNumber = data.display_phone_number
    })
  }

  public async getBusinessProfile(): Promise<ClientInfoResponse> {
    const url = `/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`;
    return await this.makeApiRequest<ClientInfoResponse>(url, "GET");
  }
}
