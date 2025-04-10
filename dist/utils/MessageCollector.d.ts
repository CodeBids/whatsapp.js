import { EventEmitter } from "events";
import type { WebhookHandler } from "../client/webhook/handlers/WebhookHandler";
import { EventType } from "../client/webhook/handlers/WebhookHandler";
export interface CollectorOptions {
    time?: number;
    max?: number;
    filter?: (message: any) => boolean;
}
export interface CollectorEvents {
    collect: (message: any) => void;
    end: (collected: Map<string, any>) => void;
}
/**
 * Collects messages and interactions from the webhook handler
 */
export declare class MessageCollector extends EventEmitter {
    private handler;
    private collected;
    private filter;
    private timeout;
    private max;
    private ended;
    private eventTypes;
    /**
     * Creates a new message collector
     * @param handler The webhook handler to collect messages from
     * @param options Collector options
     * @param eventTypes Event types to listen for (defaults to MESSAGE_RECEIVED and INTERACTION_CREATE)
     */
    constructor(handler: WebhookHandler, options?: CollectorOptions, eventTypes?: EventType[]);
    /**
     * Handles collecting a message
     * @param message The message to collect
     */
    private handleCollect;
    /**
     * Stops the collector
     */
    stop(): void;
    /**
     * Returns a promise that resolves when the collector ends
     * @returns A promise that resolves with the collected messages
     */
    awaitMessages(): Promise<Map<string, any>>;
    /**
     * Returns the first message that passes the filter
     * @param filter Filter function
     * @param time Time to wait in ms
     * @returns A promise that resolves with the first message
     */
    static awaitMessage(handler: WebhookHandler, filter?: (message: any) => boolean, time?: number, eventTypes?: EventType[]): Promise<any>;
}
