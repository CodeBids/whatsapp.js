"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingMessage = void 0;
const Messages_1 = require("../errors/Messages");
/**
 * Represents a message received from WhatsApp
 */
class IncomingMessage {
    constructor(data, client) {
        this.client = client;
        // Copy all properties from the data object
        Object.assign(this, data);
    }
    /**
     * Replies to the message with text
     * @param content Text content to send
     * @returns API response
     */
    async reply(payload) {
        payload.to = this.from;
        payload.context = { message_id: this.id };
        return this.client.message.send(payload);
    }
    /**
     * Reacts to the message with an emoji
     * @param emoji Emoji to react with
     * @returns API response
     */
    async react(emoji) {
        if (!this.id) {
            throw new Messages_1.WhatsAppApiException("Cannot react to a message without an ID", 0);
        }
        if (emoji.length > 2) {
            throw new Messages_1.WhatsAppApiException("Cannot react with more than one emoji", 0);
        }
        return this.client.message.send({
            to: this.from,
            reaction: {
                message_id: this.id,
                emoji,
            },
        });
    }
    /**
     * Marks the message as read
     * @returns API response
     */
    async markAsRead() {
        if (!this.id) {
            throw new Messages_1.WhatsAppApiException("Cannot mark a message as read without an ID", 0);
        }
        return this.client.makeApiRequest(`messages`, "POST", {
            messaging_product: "whatsapp",
            status: "read",
            message_id: this.id,
        });
    }
    /**
     * Forwards the message to another recipient
     * @param to Recipient's phone number
     * @returns API response
     */
    async forward(to) {
        // Different handling based on message type
        switch (this.type) {
            case "text":
                if (this.text) {
                    return this.client.message.send({
                        to,
                        content: this.text,
                    });
                }
                break;
            case "image":
                if (this.image && (this.image.id || this.image.link)) {
                    return this.client.message.send({
                        to,
                        files: [
                            {
                                type: "image",
                                ...(this.image.id ? { id: this.image.id } : {}),
                                ...(this.image.link ? { url: this.image.link } : {}),
                                caption: this.image.caption,
                            },
                        ],
                    });
                }
                break;
            case "video":
                if (this.video && (this.video.id || this.video.link)) {
                    return this.client.message.send({
                        to,
                        files: [
                            {
                                type: "video",
                                ...(this.video.id ? { id: this.video.id } : {}),
                                ...(this.video.link ? { url: this.video.link } : {}),
                                caption: this.video.caption,
                            },
                        ],
                    });
                }
                break;
            case "audio":
                if (this.audio && (this.audio.id || this.audio.link)) {
                    return this.client.message.send({
                        to,
                        files: [
                            {
                                type: "audio",
                                ...(this.audio.id ? { id: this.audio.id } : {}),
                                ...(this.audio.link ? { url: this.audio.link } : {}),
                            },
                        ],
                    });
                }
                break;
            case "document":
                if (this.document && (this.document.id || this.document.link)) {
                    return this.client.message.send({
                        to,
                        files: [
                            {
                                type: "document",
                                ...(this.document.id ? { id: this.document.id } : {}),
                                ...(this.document.link ? { url: this.document.link } : {}),
                                caption: this.document.caption,
                                filename: this.document.filename,
                            },
                        ],
                    });
                }
                break;
            case "location":
                // if (this.location) {
                //   return this.client.message.send({
                //     to,
                //     location: this.location,
                //   })
                // }
                break;
            // Add more cases as needed
        }
        // If we couldn't forward the message
        throw new Messages_1.WhatsAppApiException(`Cannot forward message of type ${this.type}`, 0);
    }
}
exports.IncomingMessage = IncomingMessage;
