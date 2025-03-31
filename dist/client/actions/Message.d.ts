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
     * Cleans up the phone number to make it compatible with WhatsApp API.
     * Removes the extra 9 for Argentine numbers.
     * @param phoneNumber The phone number in international format.
     * @returns Cleaned phone number for WhatsApp API.
     */
    private cleanPhoneNumber;
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
