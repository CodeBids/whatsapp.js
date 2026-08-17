import { EventEmitter } from "events";
import { Message } from "./actions/Message";
import { QrCodeManager } from "./actions/QrCodes";
import { WhatsAppApiService } from "../services/wa-api-cloud.service";
import type { ClientInfoResponse, ClientOptions, BusinessProfileUpdate, MediaUploadResponse, MediaUrlResponse, MediaDeleteResponse } from "../types";
import { WebhookHandler, EventType } from "./webhook/handlers/WebhookHandler";
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
    qrCodes: QrCodeManager;
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
    /**
     * Gets the webhook handler
     * @returns The webhook handler or null if not initialized
     * @internal
     */
    getWebhookHandler(): WebhookHandler | null;
    /**
     * Creates a message collector
     * @param options Collector options
     * @param eventTypes Event types to listen for
     * @returns A new message collector
     */
    createMessageCollector(options?: import("../utils/MessageCollector").CollectorOptions, eventTypes?: EventType[]): import("../utils/MessageCollector").MessageCollector;
    /**
     * Waits for a single message that passes the filter
     * @param filter Filter function
     * @param time Time to wait in ms
     * @param eventTypes Event types to listen for
     * @returns A promise that resolves with the first message
     */
    awaitMessage(filter?: (message: any) => boolean, time?: number, eventTypes?: EventType[]): Promise<any>;
    getBusinessProfile(): Promise<ClientInfoResponse>;
    /**
     * Updates the business profile
     * @param profile Business profile fields to update
     * @returns API response
     */
    updateBusinessProfile(profile: BusinessProfileUpdate): Promise<any>;
    /**
     * Sends a typing indicator to the user
     * @param messageId The ID of the last message received from the user
     * @returns API response
     */
    sendTypingIndicator(messageId: string): Promise<any>;
    /**
     * Marks a message as read (shows blue check marks)
     * @param messageId The ID of the message to mark as read
     * @returns API response
     */
    markAsRead(messageId: string): Promise<any>;
    /**
     * Uploads media to WhatsApp servers
     * @param fileBuffer File content as Buffer
     * @param mimeType MIME type of the file (e.g., "image/jpeg", "video/mp4")
     * @param filename Filename for the upload
     * @returns Promise with the media ID
     */
    uploadMedia(fileBuffer: Buffer, mimeType: string, filename: string): Promise<MediaUploadResponse>;
    /**
     * Gets the URL of an uploaded media file
     * @param mediaId Media ID
     * @returns Promise with the media URL information
     */
    getMediaUrl(mediaId: string): Promise<MediaUrlResponse>;
    /**
     * Deletes an uploaded media file
     * @param mediaId Media ID
     * @returns Promise with the deletion result
     */
    deleteMedia(mediaId: string): Promise<MediaDeleteResponse>;
    /**
     * Downloads media from WhatsApp servers
     * @param mediaUrl The media URL obtained from getMediaUrl
     * @returns Promise with the media as ArrayBuffer
     */
    downloadMedia(mediaUrl: string): Promise<ArrayBuffer>;
    /**
     * Downloads media by its ID (convenience method)
     * @param mediaId Media ID
     * @returns Promise with the media as ArrayBuffer
     */
    downloadMediaById(mediaId: string): Promise<ArrayBuffer>;
}
