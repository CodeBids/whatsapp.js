"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookHandler = exports.EventType = void 0;
const events_1 = require("events");
const crypto_1 = require("crypto");
/**
 * Types of events that can be emitted by the webhook handler
 */
var EventType;
(function (EventType) {
    EventType["MESSAGE_RECEIVED"] = "message.received";
    EventType["MESSAGE_SENT"] = "message.sent";
    EventType["MESSAGE_DELIVERED"] = "message.delivered";
    EventType["MESSAGE_READ"] = "message.read";
    EventType["MESSAGE_FAILED"] = "message.failed";
    EventType["MESSAGE_REACTION"] = "message.reaction";
    EventType["STATUS_UPDATED"] = "status.updated";
    EventType["INTERACTION_CREATE"] = "interaction.create";
    /** A group was created, or a group's creation/deletion otherwise changed state (see `client.groups`) */
    EventType["GROUP_LIFECYCLE_UPDATE"] = "group.lifecycle_update";
    /** A participant joined, left, or was removed from a group */
    EventType["GROUP_PARTICIPANTS_UPDATE"] = "group.participants_update";
    /** A group's subject, description or picture changed */
    EventType["GROUP_SETTINGS_UPDATE"] = "group.settings_update";
    /** A group's status changed (e.g. suspended) */
    EventType["GROUP_STATUS_UPDATE"] = "group.status_update";
    /** Beta: emitted for entries on the `calls` webhook field (see the Calling API, `client.calling`) */
    EventType["CALL_EVENT"] = "call.event";
    /** Emitted for any subscribed webhook field this library doesn't parse into a more specific event (e.g. account_alerts, message_template_status_update, phone_number_quality_update). */
    EventType["WEBHOOK_EVENT"] = "webhook.event";
})(EventType || (exports.EventType = EventType = {}));
/** Maps group-related webhook field names to the EventType emitted for them */
const GROUP_EVENT_TYPES = {
    group_lifecycle_update: EventType.GROUP_LIFECYCLE_UPDATE,
    group_participants_update: EventType.GROUP_PARTICIPANTS_UPDATE,
    group_settings_update: EventType.GROUP_SETTINGS_UPDATE,
    group_status_update: EventType.GROUP_STATUS_UPDATE,
};
/**
 * Handler for WhatsApp webhook events
 */
class WebhookHandler extends events_1.EventEmitter {
    constructor(client, verifyToken, appSecret) {
        super();
        this.activeCollectors = new Set();
        this.client = client;
        this.verifyToken = verifyToken;
        this.appSecret = appSecret;
    }
    /**
     * Verifies the `X-Hub-Signature-256` header Meta sends with every webhook POST request,
     * proving the payload was sent by Meta and not tampered with in transit.
     * @param rawBody The raw (unparsed) request body, exactly as received
     * @param signatureHeader The value of the `X-Hub-Signature-256` request header
     * @param appSecret Your app secret, found in the App Dashboard
     * @returns true if the signature is present and matches the payload
     */
    static verifySignature(rawBody, signatureHeader, appSecret) {
        if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
            return false;
        }
        const expectedSignature = (0, crypto_1.createHmac)("sha256", appSecret)
            .update(rawBody)
            .digest("hex");
        const providedSignature = signatureHeader.slice("sha256=".length);
        const expectedBuffer = Buffer.from(expectedSignature, "hex");
        const providedBuffer = Buffer.from(providedSignature, "hex");
        if (expectedBuffer.length !== providedBuffer.length) {
            return false;
        }
        return (0, crypto_1.timingSafeEqual)(expectedBuffer, providedBuffer);
    }
    /**
     * Registers an active collector
     * @param collector The collector to register
     */
    registerCollector(collector) {
        this.activeCollectors.add(collector);
    }
    /**
     * Unregisters an active collector
     * @param collector The collector to unregister
     */
    unregisterCollector(collector) {
        this.activeCollectors.delete(collector);
    }
    /**
     * Handles incoming webhook requests
     * @param req Incoming HTTP request
     * @param res HTTP response
     */
    async handleRequest(req, res) {
        const method = req.method;
        if (method === "GET") {
            // Handle verification request
            this.handleVerification(req, res);
        }
        else if (method === "POST") {
            // Handle webhook event
            await this.handleWebhookEvent(req, res);
        }
        else {
            // Method not allowed
            res.writeHead(405, { "Content-Type": "text/plain" });
            res.end("Method Not Allowed");
        }
    }
    /**
     * Handles webhook verification request
     * @param req Incoming HTTP request
     * @param res HTTP response
     */
    handleVerification(req, res) {
        const url = new URL(req.url || "", `http://${req.headers.host}`);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");
        if (mode === "subscribe" && token === this.verifyToken && challenge) {
            // Verification successful
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(challenge);
        }
        else {
            // Verification failed
            res.writeHead(403, { "Content-Type": "text/plain" });
            res.end("Verification Failed");
        }
    }
    /**
     * Handles incoming webhook events
     * @param req Incoming HTTP request
     * @param res HTTP response
     */
    async handleWebhookEvent(req, res) {
        const chunks = [];
        // Collect the raw request body (kept as a Buffer so signature validation hashes the exact bytes Meta sent)
        req.on("data", (chunk) => {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        // Process the event when the request is complete
        req.on("end", () => {
            const rawBody = Buffer.concat(chunks);
            // Validate the payload signature when an app secret was configured
            if (this.appSecret) {
                const signature = req.headers["x-hub-signature-256"];
                const signatureHeader = Array.isArray(signature) ? signature[0] : signature;
                if (!WebhookHandler.verifySignature(rawBody, signatureHeader, this.appSecret)) {
                    console.error("Webhook signature validation failed. Rejecting request.");
                    res.writeHead(401, { "Content-Type": "text/plain" });
                    res.end("Invalid signature");
                    return;
                }
            }
            try {
                const data = JSON.parse(rawBody.toString("utf-8"));
                // Acknowledge receipt of the event
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("EVENT_RECEIVED");
                // Process the event
                this.processEvent(data);
            }
            catch (error) {
                console.error("Error processing webhook event:", error);
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Bad Request");
            }
        });
    }
    /**
     * Processes a webhook event and emits the appropriate event
     * @param data Webhook event data
     */
    processEvent(data) {
        // Check if this is a valid WhatsApp webhook event
        if (!data.object || data.object !== "whatsapp_business_account") {
            return;
        }
        // Process each entry in the webhook event
        for (const entry of data.entry || []) {
            for (const change of entry.changes || []) {
                if (change.field in GROUP_EVENT_TYPES) {
                    this.emit(GROUP_EVENT_TYPES[change.field], change.value);
                    continue;
                }
                if (change.field === "calls") {
                    for (const call of change.value?.calls || []) {
                        this.emit(EventType.CALL_EVENT, call);
                    }
                    continue;
                }
                if (change.field !== "messages") {
                    // Fields this library doesn't parse into a dedicated event (account_alerts,
                    // message_template_status_update, phone_number_quality_update, etc.) are still
                    // surfaced, unparsed, so consumers can react to them if they subscribed to the field.
                    this.emit(EventType.WEBHOOK_EVENT, { field: change.field, value: change.value });
                    continue;
                }
                const value = change.value;
                // Process messages
                if (value.messages && value.messages.length > 0) {
                    for (const message of value.messages) {
                        // Prepare event data
                        let eventData;
                        let eventType;
                        // Check if this is an interactive message
                        if (message.type === "interactive") {
                            eventData = {
                                id: message.id,
                                from: message.from,
                                timestamp: message.timestamp,
                                type: message.interactive.type,
                                interactive: message.interactive,
                                context: message.context,
                            };
                            eventType = EventType.INTERACTION_CREATE;
                        }
                        else {
                            // Process regular messages
                            eventData = {
                                id: message.id,
                                from: message.from,
                                timestamp: message.timestamp,
                                type: message.type,
                                context: message.context,
                                ...this.extractMessageContent(message),
                            };
                            eventType = EventType.MESSAGE_RECEIVED;
                        }
                        // Check if any collector should handle this message exclusively
                        let shouldPreventDefault = false;
                        for (const collector of this.activeCollectors) {
                            if (collector.eventTypes.includes(eventType) && collector.handleCollect(eventData)) {
                                shouldPreventDefault = true;
                                break;
                            }
                        }
                        // Only emit the event if no collector prevented the default behavior
                        if (!shouldPreventDefault) {
                            this.emit(eventType, eventData);
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
                            });
                        }
                        else if (status.status === "delivered") {
                            this.emit(EventType.MESSAGE_DELIVERED, {
                                id: status.id,
                                recipient_id: status.recipient_id,
                                timestamp: status.timestamp,
                            });
                        }
                        else if (status.status === "read") {
                            this.emit(EventType.MESSAGE_READ, {
                                id: status.id,
                                recipient_id: status.recipient_id,
                                timestamp: status.timestamp,
                            });
                        }
                        else if (status.status === "failed") {
                            this.emit(EventType.MESSAGE_FAILED, {
                                id: status.id,
                                recipient_id: status.recipient_id,
                                timestamp: status.timestamp,
                                errors: status.errors,
                            });
                        }
                        else {
                            this.emit(EventType.STATUS_UPDATED, status);
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
                        });
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
    extractMessageContent(message) {
        const content = {};
        // Extract content based on message type
        switch (message.type) {
            case "text":
                content.text = message.text.body;
                break;
            case "image":
                content.image = message.image;
                break;
            case "audio":
                content.audio = message.audio;
                break;
            case "video":
                content.video = message.video;
                break;
            case "document":
                content.document = message.document;
                break;
            case "sticker":
                content.sticker = message.sticker;
                break;
            case "location":
                content.location = message.location;
                break;
            case "contacts":
                content.contacts = message.contacts;
                break;
            case "interactive":
                content.interactive = message.interactive;
                break;
            case "button":
                content.button = message.button;
                break;
            case "reaction":
                content.reaction = message.reaction;
                break;
            case "sticker":
                content.sticker = message.sticker;
                break;
            case "order":
                content.order = message.order;
                break;
        }
        return content;
    }
    /**
     * Starts a simple HTTP server to listen for webhook events
     * @param port Port to listen on
     * @param callback Callback function called when the server starts
     * @returns HTTP server instance
     */
    startServer(port, callback) {
        const http = require("http");
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res).catch((error) => {
                console.error("Error handling webhook request:", error);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            });
        });
        server.listen(port, () => {
            if (callback)
                callback();
        });
        return server;
    }
}
exports.WebhookHandler = WebhookHandler;
