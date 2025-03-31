"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookHandler = exports.EventType = void 0;
const events_1 = require("events");
/**
 * Types of events that can be emitted by the webhook handler
 */
var EventType;
(function (EventType) {
    EventType["MESSAGE_RECEIVED"] = "message.received";
    EventType["MESSAGE_DELIVERED"] = "message.delivered";
    EventType["MESSAGE_READ"] = "message.read";
    EventType["MESSAGE_REACTION"] = "message.reaction";
    EventType["STATUS_UPDATED"] = "status.updated";
})(EventType || (exports.EventType = EventType = {}));
/**
 * Handler for WhatsApp webhook events
 */
class WebhookHandler extends events_1.EventEmitter {
    constructor(client, verifyToken) {
        super();
        this.client = client;
        this.verifyToken = verifyToken;
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
        let body = "";
        // Collect request body
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        // Process the event when the request is complete
        req.on("end", () => {
            try {
                const data = JSON.parse(body);
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
                if (change.field !== "messages") {
                    continue;
                }
                const value = change.value;
                // Process messages
                if (value.messages && value.messages.length > 0) {
                    for (const message of value.messages) {
                        const eventData = {
                            id: message.id,
                            from: message.from,
                            timestamp: message.timestamp,
                            type: message.type,
                            context: message.context,
                            ...this.extractMessageContent(message),
                        };
                        this.emit(EventType.MESSAGE_RECEIVED, eventData);
                    }
                }
                // Process delivery status updates
                if (value.statuses && value.statuses.length > 0) {
                    for (const status of value.statuses) {
                        if (status.status === "delivered") {
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
            console.log(`WhatsApp webhook server listening on port ${port}`);
            if (callback)
                callback();
        });
        return server;
    }
}
exports.WebhookHandler = WebhookHandler;
