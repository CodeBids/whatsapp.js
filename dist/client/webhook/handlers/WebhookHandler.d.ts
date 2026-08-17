import { EventEmitter } from "events";
import type { IncomingMessage, ServerResponse } from "http";
import type { Client } from "../../Client";
/**
 * Types of events that can be emitted by the webhook handler
 */
export declare enum EventType {
    MESSAGE_RECEIVED = "message.received",
    MESSAGE_SENT = "message.sent",
    MESSAGE_DELIVERED = "message.delivered",
    MESSAGE_READ = "message.read",
    MESSAGE_FAILED = "message.failed",
    MESSAGE_REACTION = "message.reaction",
    STATUS_UPDATED = "status.updated",
    INTERACTION_CREATE = "interaction.create",
    /** Beta: emitted for entries on the `calls` webhook field (see the Calling API, `client.calling`) */
    CALL_EVENT = "call.event",
    /** Emitted for any subscribed webhook field this library doesn't parse into a more specific event (e.g. account_alerts, message_template_status_update, phone_number_quality_update). */
    WEBHOOK_EVENT = "webhook.event"
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
    private appSecret?;
    private activeCollectors;
    constructor(client: Client, verifyToken: string, appSecret?: string);
    /**
     * Verifies the `X-Hub-Signature-256` header Meta sends with every webhook POST request,
     * proving the payload was sent by Meta and not tampered with in transit.
     * @param rawBody The raw (unparsed) request body, exactly as received
     * @param signatureHeader The value of the `X-Hub-Signature-256` request header
     * @param appSecret Your app secret, found in the App Dashboard
     * @returns true if the signature is present and matches the payload
     */
    static verifySignature(rawBody: Buffer | string, signatureHeader: string | null | undefined, appSecret: string): boolean;
    /**
     * Registers an active collector
     * @param collector The collector to register
     */
    registerCollector(collector: any): void;
    /**
     * Unregisters an active collector
     * @param collector The collector to unregister
     */
    unregisterCollector(collector: any): void;
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
