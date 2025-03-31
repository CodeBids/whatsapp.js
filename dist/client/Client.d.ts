import { EventEmitter } from "events";
import type { ClientInfoResponse, ClientOptions } from "../types";
import { Message } from "./actions/Message";
/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
export declare class Client extends EventEmitter {
    private phoneId;
    private accessToken;
    private version;
    private _webhook;
    private _webhookServer;
    name: string | null;
    quality: string | null;
    id: string | null;
    displayPhoneNumber: string | null;
    message: Message;
    constructor(options: ClientOptions);
    /**
     * Sets up a webhook handler for receiving events
     * @param verifyToken Token used to verify webhook requests
     * @private
     */
    private _setupWebhook;
    /**
     * Starts a webhook server to listen for events
     * @param port Port to listen on
     * @param callback Callback function called when the server starts
     * @returns HTTP server instance
     * @private
     */
    private _startWebhookServer;
    /**
     * Starts the webhook server if it's not already running
     * @param port Port to listen on
     * @param callback Callback function called when the server starts
     * @returns HTTP server instance
     */
    startServer(port: number, callback?: () => void): any;
    /**
     * Stops the webhook server if it's running
     * @param callback Callback function called when the server stops
     */
    stopServer(callback?: () => void): void;
    private getBaseUrl;
    private initializeClientData;
    getBusinessProfile(): Promise<ClientInfoResponse>;
}
