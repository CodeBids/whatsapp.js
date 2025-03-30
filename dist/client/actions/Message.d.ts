import { type MessageApiResponse, type MessagePayload, LanguageCode } from "../../types/index";
export declare class Message {
    private baseUrl;
    private accessToken;
    constructor(baseUrl?: string, accessToken?: string);
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
     * Builds the message body based on the provided payload
     * @param payload Message payload
     * @returns Message body for the API
     */
    private buildMessageBody;
    /**
     * Convenience method to send a text message
     * @param to Recipient's phone number
     * @param content Message content
     * @returns API response
     */
    sendText(to: string, content: string): Promise<MessageApiResponse>;
    /**
     * Convenience method to send a template message
     * @param to Recipient's phone number
     * @param templateName Template name
     * @param language Template language
     * @param components Template components (optional)
     * @returns API response
     */
    sendTemplate(to: string, templateName: string, language: LanguageCode, components?: any[]): Promise<MessageApiResponse>;
    /**
     * Convenience method to send an image
     * @param to Recipient's phone number
     * @param url Image URL
     * @param caption Image caption (optional)
     * @returns API response
     */
    sendImage(to: string, url: string, caption?: string): Promise<MessageApiResponse>;
    /**
     * Convenience method to send a document
     * @param to Recipient's phone number
     * @param url Document URL
     * @param filename Document filename
     * @param caption Document caption (optional)
     * @returns API response
     */
    sendDocument(to: string, url: string, filename: string, caption?: string): Promise<MessageApiResponse>;
    /**
     * Convenience method to send a video
     * @param to Recipient's phone number
     * @param url Video URL
     * @param caption Video caption (optional)
     * @returns API response
     */
    sendVideo(to: string, url: string, caption?: string): Promise<MessageApiResponse>;
    /**
     * Convenience method to send an audio
     * @param to Recipient's phone number
     * @param url Audio URL
     * @returns API response
     */
    sendAudio(to: string, url: string): Promise<MessageApiResponse>;
    /**
     * Convenience method to send a location
     * @param to Recipient's phone number
     * @param latitude Latitude
     * @param longitude Longitude
     * @param name Location name (optional)
     * @param address Location address (optional)
     * @returns API response
     */
    sendLocation(to: string, latitude: number, longitude: number, name?: string, address?: string): Promise<MessageApiResponse>;
}
