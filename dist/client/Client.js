"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const events_1 = require("events");
const Message_1 = require("./actions/Message");
const IncomingMessage_1 = require("../models/IncomingMessage");
const wa_api_cloud_service_1 = require("../services/wa-api-cloud.service");
const WebhookHandler_1 = require("./webhook/handlers/WebhookHandler");
/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
class Client extends events_1.EventEmitter {
    constructor(options) {
        super();
        this._webhook = null;
        this._webhookServer = null;
        this.name = null;
        this.quality = null;
        this.id = null;
        this.displayPhoneNumber = null;
        const { phoneId, accessToken, webhook } = options;
        if (!phoneId || !accessToken) {
            throw new Error("Phone ID and Access Token are required");
        }
        if (!/^\d+$/.test(phoneId)) {
            console.error("Invalid Phone ID format:", phoneId);
            throw new Error("Phone ID must be a numeric string");
        }
        if (!/^[A-Za-z0-9]+$/.test(accessToken)) {
            console.error("Invalid Access Token format");
            throw new Error("Access Token must be alphanumeric");
        }
        this.apiService = new wa_api_cloud_service_1.WhatsAppApiService(accessToken, "v22.0", phoneId);
        this.message = new Message_1.Message(this);
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
    getApiService() {
        return this.apiService;
    }
    /**
     * Sets up a webhook handler for receiving events
     * @param verifyToken Token used to verify webhook requests
     * @private
     */
    _setupWebhook(verifyToken) {
        this._webhook = new WebhookHandler_1.WebhookHandler(this, verifyToken);
        // Forward all webhook events to the client
        Object.values(WebhookHandler_1.EventType).forEach((eventType) => {
            this._webhook.on(eventType, (data) => {
                // For message received events, convert to IncomingMessage
                if (eventType === WebhookHandler_1.EventType.MESSAGE_RECEIVED) {
                    const message = new IncomingMessage_1.IncomingMessage(data, this);
                    this.emit(eventType, message);
                }
                else {
                    this.emit(eventType, data);
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
    _startWebhookServer(port, callback) {
        if (!this._webhook) {
            throw new Error("Webhook handler not initialized. Please provide webhook options when creating the client.");
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
    startServer(port, callback) {
        if (!this._webhook) {
            throw new Error("Webhook handler not initialized. Please provide webhook options when creating the client.");
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
    stopServer(callback) {
        if (this._webhookServer) {
            this._webhookServer.close(() => {
                this._webhookServer = null;
                if (callback)
                    callback();
            });
        }
        else {
            if (callback)
                callback();
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
    async makeApiRequest(url, method, data) {
        return this.apiService.request(url, method, data);
    }
    /**
     * Makes a request to the phone endpoint
     * @param endpoint API endpoint
     * @param method HTTP method
     * @param data Request data
     * @returns API response
     * @internal
     */
    async makePhoneRequest(endpoint, method, data) {
        return this.apiService.phoneRequest(endpoint, method, data);
    }
    async initializeClientData() {
        try {
            // Usar el endpoint correcto "whatsapp_business_profile" en lugar de un string vacío
            const data = await this.makePhoneRequest("whatsapp_business_profile", "GET");
            this.name = data.verified_name;
            this.quality = data.quality_rating;
            this.id = data.id;
            this.displayPhoneNumber = data.display_phone_number;
        }
        catch (error) {
            console.error("Error initializing client data:", error);
            throw error;
        }
    }
    /**
     * Gets the webhook handler
     * @returns The webhook handler or null if not initialized
     * @internal
     */
    getWebhookHandler() {
        return this._webhook;
    }
    /**
     * Creates a message collector
     * @param options Collector options
     * @param eventTypes Event types to listen for
     * @returns A new message collector
     */
    createMessageCollector(options = {}, eventTypes = [WebhookHandler_1.EventType.MESSAGE_RECEIVED, WebhookHandler_1.EventType.INTERACTION_CREATE]) {
        const { MessageCollector } = require("../utils/MessageCollector");
        return new MessageCollector(this, options, eventTypes);
    }
    /**
     * Waits for a single message that passes the filter
     * @param filter Filter function
     * @param time Time to wait in ms
     * @param eventTypes Event types to listen for
     * @returns A promise that resolves with the first message
     */
    awaitMessage(filter = () => true, time = 60000, eventTypes = [WebhookHandler_1.EventType.MESSAGE_RECEIVED, WebhookHandler_1.EventType.INTERACTION_CREATE]) {
        const { MessageCollector } = require("../utils/MessageCollector");
        return MessageCollector.awaitMessage(this, filter, time, eventTypes);
    }
    async getBusinessProfile() {
        const url = `whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`;
        return await this.makeApiRequest(url, "GET");
    }
}
exports.Client = Client;
