"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const events_1 = require("events");
const Message_1 = require("./actions/Message");
const Groups_1 = require("./actions/Groups");
const Templates_1 = require("./actions/Templates");
const Calling_1 = require("./actions/Calling");
const ConversationalAutomation_1 = require("./actions/ConversationalAutomation");
const QrCodes_1 = require("./actions/QrCodes");
const BlockedUsers_1 = require("./actions/BlockedUsers");
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
        this.wabaId = null;
        this.name = null;
        this.quality = null;
        this.id = null;
        this.displayPhoneNumber = null;
        const { phoneId, accessToken, webhook, wabaId } = options;
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
        if (wabaId) {
            if (!/^\d+$/.test(wabaId)) {
                console.error("Invalid WABA ID format:", wabaId);
                throw new Error("WABA ID must be a numeric string");
            }
            this.wabaId = wabaId;
        }
        this.apiService = new wa_api_cloud_service_1.WhatsAppApiService(accessToken, "v25.0", phoneId);
        this.message = new Message_1.Message(this);
        this.groups = new Groups_1.GroupManager(this);
        this.templates = new Templates_1.TemplateManager(this);
        this.calling = new Calling_1.CallingManager(this);
        this.conversationalAutomation = new ConversationalAutomation_1.ConversationalAutomationManager(this);
        this.qrCodes = new QrCodes_1.QrCodeManager(this);
        this.blockedUsers = new BlockedUsers_1.BlockedUsersManager(this);
        // Initialize webhook if options are provided
        if (webhook && webhook.verifyToken) {
            this._setupWebhook(webhook.verifyToken, webhook.appSecret);
            // Start webhook server automatically if autoStart is true or not specified
            if (webhook.autoStart !== false && webhook.port) {
                this._startWebhookServer(webhook.port);
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
            });
        })
            .catch((error) => {
            console.error("Error initializing client data:", error);
        });
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
     * @param appSecret Optional app secret used to validate the `X-Hub-Signature-256` header on incoming requests
     * @private
     */
    _setupWebhook(verifyToken, appSecret) {
        this._webhook = new WebhookHandler_1.WebhookHandler(this, verifyToken, appSecret);
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
    /**
     * Makes a request against an arbitrary Graph API path (not scoped under the phone number ID).
     * Used internally for WABA-level resources such as phone numbers, message templates and Flows,
     * and for operating on a specific node ID directly (e.g. a group ID).
     * @param path Path relative to the Graph API version
     * @param method HTTP method
     * @param data Request data
     * @returns API response
     * @internal
     */
    async makeGraphRequest(path, method, data) {
        return this.apiService.graphRequest(path, method, data);
    }
    /**
     * Updates a group's profile picture (and optionally other fields in the same multipart request)
     * @param groupId Group ID
     * @param fileBuffer JPEG image content
     * @param extraFields Additional form fields to send alongside the file
     * @returns API response
     * @internal
     */
    async updateGroupProfilePicture(groupId, fileBuffer, extraFields) {
        return this.apiService.updateGroupProfilePicture(groupId, fileBuffer, extraFields);
    }
    /**
     * Gets the phone number ID this client was configured with
     * @returns The phone number ID
     */
    getPhoneId() {
        return this.apiService.getPhoneId();
    }
    /**
     * Gets the WhatsApp Business Account ID this client was configured with, if any
     * @returns The WABA ID, or null if it wasn't provided
     */
    getWabaId() {
        return this.wabaId;
    }
    async initializeClientData() {
        try {
            const data = await this.makePhoneRequest("?fields=verified_name,code_verification_status,display_phone_number,quality_rating,platform_type,throughput,id", "GET");
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
    /**
     * Updates the business profile
     * @param profile Business profile fields to update
     * @returns API response
     */
    async updateBusinessProfile(profile) {
        return await this.makeApiRequest("whatsapp_business_profile", "POST", {
            messaging_product: "whatsapp",
            ...profile,
        });
    }
    /**
     * Sends a typing indicator to the user
     * @param messageId The ID of the last message received from the user
     * @returns API response
     */
    async sendTypingIndicator(messageId) {
        return await this.makeApiRequest("messages", "POST", {
            messaging_product: "whatsapp",
            status: "read",
            message_id: messageId,
            typing_indicator: {
                type: "text",
            },
        });
    }
    /**
     * Marks a message as read (shows blue check marks)
     * @param messageId The ID of the message to mark as read
     * @returns API response
     */
    async markAsRead(messageId) {
        return await this.makeApiRequest("messages", "POST", {
            messaging_product: "whatsapp",
            status: "read",
            message_id: messageId,
        });
    }
    /**
     * Uploads media to WhatsApp servers
     * @param fileBuffer File content as Buffer
     * @param mimeType MIME type of the file (e.g., "image/jpeg", "video/mp4")
     * @param filename Filename for the upload
     * @returns Promise with the media ID
     */
    async uploadMedia(fileBuffer, mimeType, filename) {
        return this.apiService.uploadMedia(fileBuffer, mimeType, filename);
    }
    /**
     * Gets the URL of an uploaded media file
     * @param mediaId Media ID
     * @returns Promise with the media URL information
     */
    async getMediaUrl(mediaId) {
        return this.apiService.getMediaUrl(mediaId);
    }
    /**
     * Deletes an uploaded media file
     * @param mediaId Media ID
     * @returns Promise with the deletion result
     */
    async deleteMedia(mediaId) {
        return this.apiService.deleteMedia(mediaId);
    }
    /**
     * Downloads media from WhatsApp servers
     * @param mediaUrl The media URL obtained from getMediaUrl
     * @returns Promise with the media as ArrayBuffer
     */
    async downloadMedia(mediaUrl) {
        return this.apiService.downloadMedia(mediaUrl);
    }
    /**
     * Downloads media by its ID (convenience method)
     * @param mediaId Media ID
     * @returns Promise with the media as ArrayBuffer
     */
    async downloadMediaById(mediaId) {
        const mediaInfo = await this.getMediaUrl(mediaId);
        return this.downloadMedia(mediaInfo.url);
    }
}
exports.Client = Client;
