import type { Client } from "../client/Client";
import type { MessageApiResponse } from "../types";
/**
 * Represents a message received from WhatsApp
 */
export declare class IncomingMessage {
    id: string;
    from: string;
    timestamp: string;
    type: string;
    text?: string;
    image?: any;
    audio?: any;
    video?: any;
    document?: any;
    location?: any;
    contacts?: any[];
    interactive?: any;
    button?: any;
    reaction?: any;
    context?: any;
    private client;
    constructor(data: any, client: Client);
    /**
     * Replies to the message with text
     * @param content Text content to send
     * @returns API response
     */
    reply(content: string): Promise<MessageApiResponse>;
    /**
     * Replies to the message with a template
     * @param templateName Template name
     * @param language Template language
     * @param components Template components (optional)
     * @returns API response
     */
    /**
     * Replies to the message with a file
     * @param file File attachment
     * @returns API response
     */
    /**
     * Replies to the message with an image
     * @param url Image URL
     * @param caption Image caption (optional)
     * @returns API response
     */
    /**
     * Replies to the message with a document
     * @param url Document URL
     * @param filename Document filename
     * @param caption Document caption (optional)
     * @returns API response
     */
    /**
     * Replies to the message with a video
     * @param url Video URL
     * @param caption Video caption (optional)
     * @returns API response
     */
    /**
     * Replies to the message with an audio
     * @param url Audio URL
     * @returns API response
     */
    /**
     * Replies to the message with a location
     * @param latitude Latitude
     * @param longitude Longitude
     * @param name Location name (optional)
     * @param address Location address (optional)
     * @returns API response
     */
    /**
     * Reacts to the message with an emoji
     * @param emoji Emoji to react with
     * @returns API response
     */
    react(emoji: string): Promise<MessageApiResponse>;
    /**
     * Marks the message as read
     * @returns API response
     */
    markAsRead(): Promise<any>;
    /**
     * Forwards the message to another recipient
     * @param to Recipient's phone number
     * @returns API response
     */
    forward(to: string): Promise<MessageApiResponse | null>;
}
