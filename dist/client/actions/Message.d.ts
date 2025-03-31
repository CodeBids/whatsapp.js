import { type MessageApiResponse, type MessagePayload } from "../../types/index";
import { Client } from "../..";
export declare class Message {
    private client;
    constructor(client: Client);
    /**
     * Sends a message through the WhatsApp API with flexible content options
     * @param payload Message payload with various content options
     * @returns API response
     */
    send(payload: MessagePayload): Promise<MessageApiResponse>;
    /**
     * Validates the message payload
     * @param payload Message payload
     */
    private validatePayload;
    /**
     * Validates the Component payload
     * @param component Component
     */
    private validateComponent;
    /**
     * Builds the message body based on the provided payload
     * @param payload Message payload
     * @returns Message body for the API
     */
    private buildMessageBody;
}
