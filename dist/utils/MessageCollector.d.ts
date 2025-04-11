import { EventEmitter } from "events";
import type { Client } from "../client/Client";
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
     * @param client The client instance to collect messages from
     * @param options Collector options
     * @param eventTypes Event types to listen for (defaults to MESSAGE_RECEIVED and INTERACTION_CREATE)
     */
    constructor(client: Client, options?: CollectorOptions, eventTypes?: EventType[]);
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
     * @param client The client instance
     * @param filter Filter function
     * @param time Time to wait in ms
     * @returns A promise that resolves with the first message
     */
    static awaitMessage(client: Client, filter?: (message: any) => boolean, time?: number, eventTypes?: EventType[]): Promise<any>;
}
