import { EventEmitter } from "events";
import { Message } from "./actions/Message";
import { WhatsAppApiService } from "../services/wa-api-cloud.service";
import type { ClientInfoResponse, ClientOptions } from "../types";
/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
export declare class Client extends EventEmitter {
    private apiService;
    private _webhook;
    private _webhookServer;
    name: string | null;
    quality: string | null;
    id: string | null;
    displayPhoneNumber: string | null;
    message: Message;
    constructor(options: ClientOptions);
    /**
     * Gets the API service
     * @returns WhatsApp API service
     * @internal
     */
    getApiService(): WhatsAppApiService;
    /**
     * Sets up a webhook handler for receiving events
     * @param verifyToken Token used to verify webhook requests
     * @private
     */
    _setupWebhook(verifyToken: string): void;
    /**
     * Starts a webhook server to listen for events
     * @param port Port to listen on
     * @param callback Callback function called when the server starts
     * @returns HTTP server instance
     * @private
     */
    _startWebhookServer(port: number, callback?: () => void): any;
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
    /**
     * Makes a direct API request
     * @param url API URL
     * @param method HTTP method
     * @param data Request data
     * @returns API response
     * @internal
     */
    makeApiRequest<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any): Promise<T>;
    /**
     * Makes a request to the phone endpoint
     * @param endpoint API endpoint
     * @param method HTTP method
     * @param data Request data
     * @returns API response
     * @internal
     */
    makePhoneRequest<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any): Promise<T>;
    private initializeClientData;
    getBusinessProfile(): Promise<ClientInfoResponse>;
}
