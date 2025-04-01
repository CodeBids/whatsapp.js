import type { Client } from "../client/Client";
import type { MessageApiResponse, MessagePayload } from "../types";
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
    reply(payload: MessagePayload): Promise<MessageApiResponse>;
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
