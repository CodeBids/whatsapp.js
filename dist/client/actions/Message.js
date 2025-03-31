"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const index_1 = require("../../types/index");
const Messages_1 = require("../../errors/Messages");
const __1 = require("../..");
const ContactCard_1 = require("../../models/ContactCard");
class Message {
    constructor(client) {
        this.client = client;
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
        return await this.client.makeApiRequest(`/messages`, "POST", body);
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
        if (payload.components) {
            //TODO: Validate components
        }
    }
    /**
     * Validates the Component payload
     * @param component Component
     */
    validateComponent(component) {
        switch (true) {
            case component instanceof __1.LocationCard:
                if (component.latitude === undefined ||
                    component.longitude === undefined) {
                    throw new Messages_1.WhatsAppApiException("Latitude and longitude are required for location messages", 0);
                }
                break;
            case component instanceof ContactCard_1.ContactCard:
                if (!component.firstName || !component.phones[0].number) {
                    throw new Messages_1.WhatsAppApiException("Name and phone number are required", 0);
                }
                break;
            default:
                throw new Messages_1.WhatsAppApiException("Unknown component type", 0);
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
        else if (payload.reaction) {
            console.log(`Payload is Reaction: `, payload.reaction);
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
            console.log('Components? ', payload.components);
            payload.components.forEach((component) => {
                if (component instanceof __1.LocationCard) {
                    messageBody.type = "location";
                    messageBody.location = {
                        latitude: component.latitude,
                        longitude: component.longitude,
                        ...(component.name ? { name: component.name } : {}),
                        ...(component.address ? { address: component.address } : {}),
                    };
                }
                else if (component instanceof ContactCard_1.ContactCard) {
                    messageBody.type = "contacts";
                    const phones = [];
                    component.phones.forEach((phone) => {
                        phones.push({
                            phone: phone.number,
                            type: phone.type ?? undefined,
                            wa_id: phone.wa_id,
                        });
                    });
                    const emails = [];
                    component.emails?.forEach((email) => {
                        emails.push({
                            email: email.address,
                            type: email.type === "work" ? "WORK" : "HOME",
                        });
                    });
                    const addresses = [];
                    component.addresses?.forEach((address) => {
                        addresses.push({
                            street: `${address.street.name} ${address.street.number ?? ""}`.trim(),
                            city: address.city,
                            state: address.country?.stateCode,
                            zip: address.zipCode,
                            country: address.country?.name,
                            country_code: address.country?.code,
                            type: address.type === "home" ? "HOME" : "WORK",
                        });
                    });
                    const urls = [];
                    component.urls?.forEach((website) => {
                        urls.push({
                            url: website.url,
                            type: website.type === "work" ? "WORK" : "HOME",
                        });
                    });
                    const name = {
                        formatted_name: component.formattedName ?? component.firstName,
                        first_name: component.firstName,
                        ...(component.middleName
                            ? { middle_name: component.middleName }
                            : {}),
                        ...(component.lastName ? { last_name: component.lastName } : {}),
                        ...(component.namePrefix ? { prefix: component.namePrefix } : {}),
                    };
                    const org = {
                        company: component.company?.name,
                        department: component.company?.departmentName,
                        title: component.job?.title,
                    };
                    messageBody.contacts = [
                        {
                            name,
                            phones,
                            emails: emails.length > 0 ? emails : undefined,
                            addresses: addresses.length > 0 ? addresses : undefined,
                            urls: urls.length > 0 ? urls : undefined,
                            birthday: component.birthday?.toISOString().split("T")[0],
                            org: org.company ? org : undefined,
                        },
                    ];
                }
                else {
                    throw new Messages_1.WhatsAppApiException("Unsupported component type", 0);
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
