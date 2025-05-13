"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const index_1 = require("../../types/index");
const Messages_1 = require("../../errors/Messages");
const __1 = require("../..");
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
        return await this.client.makeApiRequest(`messages`, "POST", body);
    }
    /**
     * Cleans up the phone number to make it compatible with WhatsApp API.
     * Removes the extra 9 for Argentine numbers.
     * @param phoneNumber The phone number in international format.
     * @returns Cleaned phone number for WhatsApp API.
     */
    cleanPhoneNumber(phoneNumber) {
        // Check if the number starts with +54 9 (Argentina with mobile identifier)
        if (phoneNumber.startsWith("549")) {
            // Remove the "9" after the country code
            return phoneNumber.replace(/^549/, "54");
        }
        // Remove any non-numeric characters (like +, spaces, parentheses)
        return phoneNumber.replace(/\D/g, "");
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
        // Clean the phone number before sending
        payload.to = this.cleanPhoneNumber(payload.to);
        // Validate phone number format
        if (!/^\d+$/.test(payload.to)) {
            throw new Messages_1.WhatsAppApiException("Phone number must contain only digits", 0);
        }
        // Check if at least one content type is provided
        const hasContent = Boolean(payload.content ||
            payload.template ||
            (payload.files && payload.files.length > 0) ||
            payload.interactive ||
            payload.reaction ||
            (payload.components && payload.components.length > 0) ||
            (payload.embeds && payload.embeds.length > 0));
        if (!hasContent) {
            throw new Messages_1.WhatsAppApiException("At least one content type is required (text, template, files, interactive, reaction, components, or embeds)", 0);
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
            // Validate template components if provided
            if (payload.template.components) {
                this.validateTemplateComponents(payload.template.components);
            }
        }
        // Validate files if provided
        if (payload.files && payload.files.length > 0) {
            for (const file of payload.files) {
                if (!file.type) {
                    throw new Messages_1.WhatsAppApiException("File type is required", 0);
                }
                if (!["image", "document", "audio", "video", "sticker"].includes(file.type)) {
                    throw new Messages_1.WhatsAppApiException(`Invalid file type: ${file.type}. Allowed types are: image, document, audio, video, sticker.`, 0);
                }
                if (!file.url && !file.id) {
                    throw new Messages_1.WhatsAppApiException("Either file URL or ID must be provided", 0);
                }
                // Validate URL format if provided
                if (file.url && !this.isValidUrl(file.url)) {
                    throw new Messages_1.WhatsAppApiException(`Invalid URL format: ${file.url}`, 0);
                }
                // Validate specific file type requirements
                if (file.type === "document" && !file.filename) {
                    throw new Messages_1.WhatsAppApiException("Filename is required for document files", 0);
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
        // Validate interactive if provided
        if (payload.interactive) {
            this.validateInteractive(payload.interactive);
        }
        // Validate embeds if provided
        if (payload.embeds && payload.embeds.length > 0) {
            for (const embed of payload.embeds) {
                if (!embed.body) {
                    throw new Messages_1.WhatsAppApiException("Body is required for embed messages", 0);
                }
            }
        }
        // Validate components if provided
        if (payload.components) {
            this.validateComponent(payload.components);
        }
        // Validate context if provided
        if (payload.context && !payload.context.message_id) {
            throw new Messages_1.WhatsAppApiException("Message ID is required in context for reply/quote messages", 0);
        }
    }
    /**
     * Validates template components and parameters
     * @param components Template components to validate
     */
    validateTemplateComponents(components) {
        for (const component of components) {
            // Validate component type
            if (!["header", "body", "button", "footer"].includes(component.type)) {
                throw new Messages_1.WhatsAppApiException(`Invalid component type: ${component.type}`, 0);
            }
            // Validate button sub_type if it's a button
            if (component.type === "button" && component.sub_type) {
                if (!["quick_reply", "url", "CATALOG"].includes(component.sub_type)) {
                    throw new Messages_1.WhatsAppApiException(`Invalid button sub_type: ${component.sub_type}`, 0);
                }
            }
            // Validate parameters
            if (!component.parameters || !Array.isArray(component.parameters) || component.parameters.length === 0) {
                throw new Messages_1.WhatsAppApiException(`Parameters are required for ${component.type} component`, 0);
            }
            // Validate each parameter
            for (const param of component.parameters) {
                if (!param.type) {
                    throw new Messages_1.WhatsAppApiException("Parameter type is required", 0);
                }
                // Validate parameter based on its type
                switch (param.type) {
                    case "text":
                        if (!param.text) {
                            throw new Messages_1.WhatsAppApiException("Text value is required for text parameter", 0);
                        }
                        break;
                    case "currency":
                        if (!param.currency) {
                            throw new Messages_1.WhatsAppApiException("Currency object is required for currency parameter", 0);
                        }
                        if (!param.currency.fallback_value || !param.currency.code || param.currency.amount_1000 === undefined) {
                            throw new Messages_1.WhatsAppApiException("Currency parameter must include fallback_value, code, and amount_1000", 0);
                        }
                        break;
                    case "date_time":
                        if (!param.date_time || !param.date_time.fallback_value) {
                            throw new Messages_1.WhatsAppApiException("Date time parameter must include fallback_value", 0);
                        }
                        break;
                    case "image":
                        if (!param.image || !param.image.link) {
                            throw new Messages_1.WhatsAppApiException("Image parameter must include a link", 0);
                        }
                        if (!this.isValidUrl(param.image.link)) {
                            throw new Messages_1.WhatsAppApiException(`Invalid URL format for image: ${param.image.link}`, 0);
                        }
                        break;
                    case "document":
                        if (!param.document || !param.document.link) {
                            throw new Messages_1.WhatsAppApiException("Document parameter must include a link", 0);
                        }
                        if (!this.isValidUrl(param.document.link)) {
                            throw new Messages_1.WhatsAppApiException(`Invalid URL format for document: ${param.document.link}`, 0);
                        }
                        break;
                    case "video":
                        if (!param.video || !param.video.link) {
                            throw new Messages_1.WhatsAppApiException("Video parameter must include a link", 0);
                        }
                        if (!this.isValidUrl(param.video.link)) {
                            throw new Messages_1.WhatsAppApiException(`Invalid URL format for video: ${param.video.link}`, 0);
                        }
                        break;
                    case "payload":
                        if (!param.payload) {
                            throw new Messages_1.WhatsAppApiException("Payload value is required for payload parameter", 0);
                        }
                        break;
                    case "action":
                        if (!param.action) {
                            throw new Messages_1.WhatsAppApiException("Action object is required for action parameter", 0);
                        }
                        // For catalog actions, validate required fields
                        if (component.sub_type === "CATALOG" && !param.action.thumbnail_product_retailer_id) {
                            throw new Messages_1.WhatsAppApiException("thumbnail_product_retailer_id is required for CATALOG button", 0);
                        }
                        break;
                    default:
                        throw new Messages_1.WhatsAppApiException(`Unsupported parameter type: ${param.type}`, 0);
                }
            }
        }
    }
    /**
     * Validates an interactive message
     * @param interactive Interactive message data
     */
    validateInteractive(interactive) {
        if (!interactive.type) {
            throw new Messages_1.WhatsAppApiException("Interactive type is required", 0);
        }
        if (!["button", "list", "product", "product_list", "cta_url", "text"].includes(interactive.type)) {
            throw new Messages_1.WhatsAppApiException(`Invalid interactive type: ${interactive.type}. Allowed types are: button, list, product, product_list, cta_url, text.`, 0);
        }
        if (!interactive.body || !interactive.body.text) {
            throw new Messages_1.WhatsAppApiException("Body text is required for interactive messages", 0);
        }
        // Validate header if provided
        if (interactive.header) {
            if (!interactive.header.type) {
                throw new Messages_1.WhatsAppApiException("Header type is required", 0);
            }
            if (!["text", "image", "video", "document"].includes(interactive.header.type)) {
                throw new Messages_1.WhatsAppApiException(`Invalid header type: ${interactive.header.type}. Allowed types are: text, image, video, document.`, 0);
            }
            // Validate header content based on type
            switch (interactive.header.type) {
                case "text":
                    if (!interactive.header.text) {
                        throw new Messages_1.WhatsAppApiException("Text is required for text header", 0);
                    }
                    break;
                case "image":
                    if (!interactive.header.image || (!interactive.header.image.link && !interactive.header.image.id)) {
                        throw new Messages_1.WhatsAppApiException("Image link or ID is required for image header", 0);
                    }
                    break;
                case "video":
                    if (!interactive.header.video || (!interactive.header.video.link && !interactive.header.video.id)) {
                        throw new Messages_1.WhatsAppApiException("Video link or ID is required for video header", 0);
                    }
                    break;
                case "document":
                    if (!interactive.header.document || (!interactive.header.document.link && !interactive.header.document.id)) {
                        throw new Messages_1.WhatsAppApiException("Document link or ID is required for document header", 0);
                    }
                    break;
            }
        }
        // Validate action if provided
        if (interactive.action) {
            // Validate buttons if provided
            if (interactive.action.buttons) {
                if (interactive.action.buttons.length === 0) {
                    throw new Messages_1.WhatsAppApiException("At least one button is required", 0);
                }
                if (interactive.action.buttons.length > 3) {
                    throw new Messages_1.WhatsAppApiException("Maximum 3 buttons are allowed", 0);
                }
                for (const button of interactive.action.buttons) {
                    if (!button.type) {
                        throw new Messages_1.WhatsAppApiException("Button type is required", 0);
                    }
                    if (button.type === "reply" && (!button.reply || !button.reply.id || !button.reply.title)) {
                        throw new Messages_1.WhatsAppApiException("Reply ID and title are required for reply buttons", 0);
                    }
                    if (button.type === "url" && (!button.url || !button.text)) {
                        throw new Messages_1.WhatsAppApiException("URL and text are required for URL buttons", 0);
                    }
                    if (button.type === "url" && !this.isValidUrl(button.url)) {
                        throw new Messages_1.WhatsAppApiException(`Invalid URL format: ${button.url}`, 0);
                    }
                }
            }
            // Validate sections if provided
            if (interactive.action.sections) {
                if (interactive.action.sections.length === 0) {
                    throw new Messages_1.WhatsAppApiException("At least one section is required", 0);
                }
                for (const section of interactive.action.sections) {
                    if (!section.title) {
                        throw new Messages_1.WhatsAppApiException("Section title is required", 0);
                    }
                    if (!section.rows || section.rows.length === 0) {
                        throw new Messages_1.WhatsAppApiException("At least one row is required per section", 0);
                    }
                    for (const row of section.rows) {
                        if (!row.id || !row.title) {
                            throw new Messages_1.WhatsAppApiException("Row ID and title are required", 0);
                        }
                    }
                }
            }
        }
    }
    /**
     * Validates the Component payload
     * @param component Component
     */
    validateComponent(components) {
        if (components.length === 0) {
            throw new Messages_1.WhatsAppApiException("At least one component is required", 0);
        }
        components.forEach((component) => {
            switch (true) {
                case component instanceof __1.LocationBuilder:
                    if (component.latitude === undefined || component.longitude === undefined) {
                        throw new Messages_1.WhatsAppApiException("Latitude and longitude are required for location messages", 0);
                    }
                    // Validate latitude range (-90 to 90)
                    if (component.latitude < -90 || component.latitude > 90) {
                        throw new Messages_1.WhatsAppApiException("Latitude must be between -90 and 90 degrees", 0);
                    }
                    // Validate longitude range (-180 to 180)
                    if (component.longitude < -180 || component.longitude > 180) {
                        throw new Messages_1.WhatsAppApiException("Longitude must be between -180 and 180 degrees", 0);
                    }
                    break;
                case component instanceof __1.ContactBuilder:
                    if (!component.firstName || !component.phones || component.phones.length === 0) {
                        throw new Messages_1.WhatsAppApiException("First name and at least one phone number are required", 0);
                    }
                    // Validate phone numbers
                    component.phones.forEach((phone) => {
                        if (!phone.number) {
                            throw new Messages_1.WhatsAppApiException("Phone number is required for each phone entry", 0);
                        }
                        if (!/^\d+$/.test(phone.number.toString().replace(/\D/g, ""))) {
                            throw new Messages_1.WhatsAppApiException(`Invalid phone number format: ${phone.number}`, 0);
                        }
                    });
                    // Validate emails if provided
                    if (component.emails && component.emails.length > 0) {
                        component.emails.forEach((email) => {
                            if (!email.address || !this.isValidEmail(email.address)) {
                                throw new Messages_1.WhatsAppApiException(`Invalid email format: ${email.address}`, 0);
                            }
                        });
                    }
                    // Validate URLs if provided
                    if (component.urls && component.urls.length > 0) {
                        component.urls.forEach((url) => {
                            if (!url.url || !this.isValidUrl(url.url)) {
                                throw new Messages_1.WhatsAppApiException(`Invalid URL format: ${url.url}`, 0);
                            }
                        });
                    }
                    break;
                case component instanceof __1.EmbedBuilder:
                    if (!component.body) {
                        throw new Messages_1.WhatsAppApiException("Body is required in the Embed", 0);
                    }
                    // Validate title length if provided
                    if (component.title && component.title.length > 60) {
                        throw new Messages_1.WhatsAppApiException("Embed title must be 60 characters or less", 0);
                    }
                    // Validate body length
                    if (component.body.length > 1000) {
                        throw new Messages_1.WhatsAppApiException("Embed body must be 1000 characters or less", 0);
                    }
                    // Validate footer length if provided
                    if (component.footer && component.footer.length > 60) {
                        throw new Messages_1.WhatsAppApiException("Embed footer must be 60 characters or less", 0);
                    }
                    break;
                case component instanceof __1.ButtonBuilder:
                    if (!component.type) {
                        throw new Messages_1.WhatsAppApiException("Button type is required", 0);
                    }
                    if (component.type === "reply") {
                        if (!component.reply || !component.reply.id || !component.reply.title) {
                            throw new Messages_1.WhatsAppApiException("Reply ID and title are required for reply buttons", 0);
                        }
                        if (component.text) {
                            throw new Messages_1.WhatsAppApiException("Text is not allowed for reply buttons", 0);
                        }
                    }
                    break;
                case component instanceof __1.ListBuilder:
                    if (!component.title) {
                        throw new Messages_1.WhatsAppApiException("List title is required", 0);
                    }
                    if (Array.isArray(component.rows) && component.rows.length === 0) {
                        throw new Messages_1.WhatsAppApiException("At least one row is required for the list", 0);
                    }
                    if (!component.buttonText) {
                        throw new Messages_1.WhatsAppApiException("Button text is required for the list", 0);
                    }
                    // Validate button text length
                    if (component.buttonText.length > 20) {
                        throw new Messages_1.WhatsAppApiException("Button text must be 20 characters or less", 0);
                    }
                    // Validate title length
                    if (component.title.length > 24) {
                        throw new Messages_1.WhatsAppApiException("List title must be 24 characters or less", 0);
                    }
                    // Validate rows
                    component.rows.forEach((row) => {
                        if (!row.id || !row.title) {
                            throw new Messages_1.WhatsAppApiException("Row ID and title are required for each row", 0);
                        }
                    });
                    break;
                default:
                    throw new Messages_1.WhatsAppApiException("Unknown component type", 0);
            }
        });
    }
    /**
     * Checks if a string is a valid URL
     * @param url URL to validate
     * @returns true if the URL is valid
     */
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Checks if a string is a valid email
     * @param email Email to validate
     * @returns true if the email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
            recipient_type: "individual",
            to: payload.to,
        };
        if (payload.context) {
            messageBody.context = payload.context;
        }
        /** Determine the primary message type
         * Priority order for message type determination:
         * 1. Template
         * 2. Files (first file type)
         * 3. Interactive
         * 4. Location
         * 5. Contacts
         * 6. Reaction
         * 7. Text (default)
         */
        if (payload.template) {
            messageBody.type = "template";
            messageBody.template = {
                name: payload.template.name,
                language: {
                    code: payload.template.language,
                },
            };
            // Include template components if provided
            if (payload.template.components && payload.template.components.length > 0) {
                messageBody.template.components = payload.template.components;
            }
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
            messageBody.type = "reaction";
            messageBody.reaction = payload.reaction;
        }
        else if (payload.content) {
            messageBody.type = "text";
            messageBody.text = {
                body: payload.content,
            };
        }
        else if (payload.embeds && payload.embeds.length > 0) {
            // Determinar el tipo de interactive basado en si hay componentes
            const hasComponents = payload.components && payload.components.length > 0;
            const interactiveType = hasComponents
                ? payload.components?.[0] instanceof __1.ButtonBuilder
                    ? (payload.components?.[0]).type === "reply"
                        ? "button"
                        : "cta_url"
                    : payload.components?.[0] instanceof __1.ListBuilder
                        ? "list"
                        : "text"
                : "text";
            // Inicializar el objeto interactive
            messageBody.type = "interactive";
            // Verificar si hay un archivo que pueda usarse como header
            const hasValidHeaderFile = payload.files && payload.files.length > 0 && ["image", "video", "document"].includes(payload.files[0].type);
            if (hasValidHeaderFile) {
                // Si hay un archivo válido para el header, usarlo
                const file = payload.files[0];
                messageBody.interactive = {
                    type: interactiveType,
                    header: {
                        type: file.type,
                        ...(file.url ? { [file.type]: { link: file.url } } : {}),
                        ...(file.id ? { [file.type]: { id: file.id } } : {}),
                    },
                    body: {
                        text: payload.embeds[0].body || "",
                    },
                    ...(payload.embeds[0].footer
                        ? {
                            footer: {
                                text: payload.embeds[0].footer,
                            },
                        }
                        : {}),
                };
            }
            else {
                // Si no hay un archivo válido o no hay archivos, usar un header de texto
                messageBody.interactive = {
                    type: interactiveType,
                    header: {
                        type: "text",
                        text: payload.embeds[0].title || "",
                    },
                    body: {
                        text: payload.embeds[0].body || "",
                    },
                    ...(payload.embeds[0].footer
                        ? {
                            footer: {
                                text: payload.embeds[0].footer,
                            },
                        }
                        : {}),
                };
            }
            // Si hay componentes, agregarlos como botones de acción
            if (payload.components && payload.components.length > 0) {
                switch (interactiveType) {
                    case "cta_url":
                        messageBody.interactive.action = {
                            name: "cta_url",
                            parameters: payload.components
                                .map((component) => {
                                if (component instanceof __1.ButtonBuilder && component.type) {
                                    return {
                                        display_text: component.text,
                                        url: component.url,
                                    };
                                }
                                return undefined;
                            })
                                .filter((param) => param !== undefined)[0],
                        };
                        break;
                    case "button":
                        messageBody.interactive.action = {
                            buttons: payload.components
                                .map((component) => {
                                if (component instanceof __1.ButtonBuilder && component.type) {
                                    return {
                                        type: component.type,
                                        ...(component.reply
                                            ? {
                                                reply: {
                                                    id: component.reply.id,
                                                    title: component.text ?? component.reply.title,
                                                },
                                            }
                                            : {}),
                                        ...(component.url ? { url: component.url } : {}),
                                    };
                                }
                                return undefined;
                            })
                                .filter((button) => button !== undefined),
                        };
                        break;
                    case "list":
                        messageBody.interactive.action = {
                            sections: payload.components
                                .map((component) => {
                                if (component instanceof __1.ListBuilder) {
                                    return {
                                        title: component.title,
                                        rows: component.rows.map((row) => ({
                                            id: row.id,
                                            title: row.title,
                                            ...(row.description ? { description: row.description } : {}),
                                        })),
                                    };
                                }
                                return undefined;
                            })
                                .filter((section) => section !== undefined),
                            button: payload.components[0].buttonText,
                        };
                        break;
                    default:
                        throw new Messages_1.WhatsAppApiException("Unsupported component type in interactive action", 0);
                }
            }
        }
        else if (payload.components) {
            payload.components.forEach((component) => {
                if (component instanceof __1.LocationBuilder) {
                    messageBody.type = "location";
                    messageBody.location = {
                        latitude: component.latitude,
                        longitude: component.longitude,
                        ...(component.name ? { name: component.name } : {}),
                        ...(component.address ? { address: component.address } : {}),
                    };
                }
                else if (component instanceof __1.ContactBuilder) {
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
                        ...(component.middleName ? { middle_name: component.middleName } : {}),
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
