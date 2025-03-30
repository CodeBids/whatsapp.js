"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const wa_api_cloud_service_1 = require("../../services/wa-api-cloud.service");
const index_1 = require("../../types/index");
const Messages_1 = require("../../errors/Messages");
const __1 = require("../..");
class Message {
    constructor(baseUrl = "", accessToken = "") {
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }
    /**
     * Sends a message through the WhatsApp API with flexible content options
     * @param payload Message payload with various content options
     * @returns API response
     */
    async send(payload) {
        // Validate the payload
        this.validatePayload(payload);
        // Determine the message type and build the body
        const body = this.buildMessageBody(payload);
        // Send the request to the API
        return await (0, wa_api_cloud_service_1.apiRequest)(`${this.baseUrl}/messages`, "POST", this.accessToken, body);
    }
    /**
     * Validates the message payload
     * @param payload Message payload
     */
    validatePayload(payload) {
        // Check if recipient is provided
        if (!payload.to) {
            throw new Messages_1.WhatsAppApiException("Recipient phone number is required", 0);
        }
        // Check if at least one content type is provided
        const hasContent = Boolean(payload.content ||
            payload.template ||
            (payload.files && payload.files.length > 0) ||
            payload.interactive ||
            payload.reaction ||
            (payload.components && payload.components.length > 0));
        if (!hasContent) {
            throw new Messages_1.WhatsAppApiException("At least one content type is required (text, template, files, interactive, reaction, or components)", 0);
        }
        // Validate template if provided
        if (payload.template) {
            if (!payload.template.name) {
                throw new Messages_1.WhatsAppApiException("Template name is required", 0);
            }
            if (!payload.template.language) {
                throw new Messages_1.WhatsAppApiException("Template language is required", 0);
            }
            if (!Object.values(index_1.LanguageCode).includes(payload.template.language)) {
                throw new Messages_1.WhatsAppApiException(`Invalid template language: ${payload.template.language}. Allowed languages are: ${Object.values(index_1.LanguageCode).join(", ")}.`, 0);
            }
        }
        // Validate files if provided
        if (payload.files && payload.files.length > 0) {
            for (const file of payload.files) {
                if (!file.type) {
                    throw new Messages_1.WhatsAppApiException("File type is required", 0);
                }
                if (!file.url && !file.id) {
                    throw new Messages_1.WhatsAppApiException("Either file URL or ID must be provided", 0);
                }
            }
        }
        // Validate reaction if provided
        if (payload.reaction) {
            if (!payload.reaction.message_id) {
                throw new Messages_1.WhatsAppApiException("Message ID is required for reaction messages", 0);
            }
            if (!payload.reaction.emoji) {
                throw new Messages_1.WhatsAppApiException("Emoji is required for reaction messages", 0);
            }
        }
    }
    /**
     * Builds the message body based on the provided payload
     * @param payload Message payload
     * @returns Message body for the API
     */
    buildMessageBody(payload) {
        // Initialize the message body with common properties
        const messageBody = {
            messaging_product: "whatsapp",
            to: payload.to,
        };
        // Determine the primary message type
        // Priority order for message type determination:
        // 1. Template
        // 2. Files (first file type)
        // 3. Interactive
        // 4. Location
        // 5. Contacts
        // 6. Reaction
        // 7. Text (default)
        if (payload.template) {
            messageBody.type = "template";
            messageBody.template = {
                name: payload.template.name,
                language: {
                    code: payload.template.language,
                },
                components: payload.template.components,
            };
        }
        else if (payload.files && payload.files.length > 0) {
            const file = payload.files[0];
            messageBody.type = file.type;
            // Handle different file types
            switch (file.type) {
                case "image":
                    messageBody.image = {
                        ...(file.id ? { id: file.id } : {}),
                        ...(file.url ? { link: file.url } : {}),
                        ...(file.caption ? { caption: file.caption } : {}),
                    };
                    break;
                case "document":
                    messageBody.document = {
                        ...(file.id ? { id: file.id } : {}),
                        ...(file.url ? { link: file.url } : {}),
                        ...(file.caption ? { caption: file.caption } : {}),
                        ...(file.filename ? { filename: file.filename } : {}),
                    };
                    break;
                case "audio":
                    messageBody.audio = {
                        ...(file.id ? { id: file.id } : {}),
                        ...(file.url ? { link: file.url } : {}),
                    };
                    break;
                case "video":
                    messageBody.video = {
                        ...(file.id ? { id: file.id } : {}),
                        ...(file.url ? { link: file.url } : {}),
                        ...(file.caption ? { caption: file.caption } : {}),
                    };
                    break;
                case "sticker":
                    messageBody.sticker = {
                        ...(file.id ? { id: file.id } : {}),
                        ...(file.url ? { link: file.url } : {}),
                    };
                    break;
            }
        }
        else if (payload.interactive) {
            messageBody.type = "interactive";
            messageBody.interactive = payload.interactive;
        }
        if (payload.reaction) {
            messageBody.type = "reaction";
            messageBody.reaction = payload.reaction;
        }
        else if (payload.content) {
            messageBody.type = "text";
            messageBody.text = {
                body: payload.content,
            };
        }
        else if (payload.components) {
            payload.components.forEach((component) => {
                if (component instanceof __1.LocationCard) {
                    if (component.latitude === undefined ||
                        component.longitude === undefined) {
                        throw new Messages_1.WhatsAppApiException("Latitude and longitude are required for location components", 0);
                    }
                    messageBody.type = "location";
                    messageBody.location = {
                        latitude: component.latitude,
                        longitude: component.longitude,
                        name: component.name,
                        address: component.address,
                    };
                }
                else {
                    throw new Messages_1.WhatsAppApiException("Unsupported component type in components array", 0);
                }
            });
        }
        else {
            // If we reach here, something went wrong with validation
            throw new Messages_1.WhatsAppApiException("Invalid message payload", 0);
        }
        return messageBody;
    }
}
exports.Message = Message;
