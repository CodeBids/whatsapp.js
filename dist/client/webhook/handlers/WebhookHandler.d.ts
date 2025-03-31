import { EventEmitter } from "events";
import type { IncomingMessage, ServerResponse } from "http";
import type { Client } from "../../Client";
/**
 * Types of events that can be emitted by the webhook handler
 */
export declare enum EventType {
    MESSAGE_RECEIVED = "message.received",
    MESSAGE_DELIVERED = "message.delivered",
    MESSAGE_READ = "message.read",
    MESSAGE_REACTION = "message.reaction",
    STATUS_UPDATED = "status.updated"
}
/**
 * Interface for webhook event data
 */
export interface WebhookEvent {
    type: EventType;
    data: any;
}
/**
 * Handler for WhatsApp webhook events
 */
export declare class WebhookHandler extends EventEmitter {
    private client;
    private verifyToken;
    constructor(client: Client, verifyToken: string);
    /**
     * Handles incoming webhook requests
     * @param req Incoming HTTP request
     * @param res HTTP response
     */
    handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void>;
    /**
     * Handles webhook verification request
     * @param req Incoming HTTP request
     * @param res HTTP response
     */
    private handleVerification;
    /**
     * Handles incoming webhook events
     * @param req Incoming HTTP request
     * @param res HTTP response
     */
    private handleWebhookEvent;
    /**
     * Processes a webhook event and emits the appropriate event
     * @param data Webhook event data
     */
    private processEvent;
    /**
     * Extracts the content from a message based on its type
     * @param message Message object
     * @returns Extracted content
     */
    private extractMessageContent;
    /**
     * Starts a simple HTTP server to listen for webhook events
     * @param port Port to listen on
     * @param callback Callback function called when the server starts
     * @returns HTTP server instance
     */
    startServer(port: number, callback?: () => void): any;
}
