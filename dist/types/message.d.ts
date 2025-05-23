import type { LanguageCode } from "./language";
import type { LocationBuilder } from "../models/Location";
import { ContactBuilder } from "../models/Contact";
import { ContactPayloadData, Embed } from ".";
import { ButtonBuilder } from "../models/Button";
export type MessageType = "text" | "template" | "image" | "document" | "audio" | "video" | "sticker" | "location" | "contacts" | "interactive" | "reaction";
export type Component = Embed | LocationBuilder | ContactBuilder | ButtonBuilder;
export interface FileAttachment {
    type: "audio" | "image" | "document" | "sticker" | "video";
    url?: string;
    id?: string;
    caption?: string;
    filename?: string;
}
export interface LocationData {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
}
export interface TemplateData {
    name: string;
    language: LanguageCode;
    components?: TemplateComponent[];
}
export interface TemplateComponent {
    type: "header" | "body" | "button" | "footer";
    sub_type?: "quick_reply" | "url" | "CATALOG";
    index?: string | number;
    parameters: TemplateParameter[];
}
export interface TemplateParameter {
    type: "text" | "currency" | "date_time" | "image" | "document" | "video" | "payload" | "action";
    text?: string;
    parameter_name?: string;
    currency?: {
        fallback_value: string;
        code: string;
        amount_1000: number;
    };
    date_time?: {
        fallback_value: string;
        day_of_week?: number;
        year?: number;
        month?: number;
        day_of_month?: number;
        hour?: number;
        minute?: number;
        calendar?: "GREGORIAN";
    };
    image?: {
        link: string;
    };
    document?: {
        link: string;
    };
    video?: {
        link: string;
    };
    payload?: string;
    action?: {
        thumbnail_product_retailer_id?: string;
        catalog_id?: string;
        product_retailer_id?: string;
        link?: string;
    };
}
export interface InteractiveData {
    type: "button" | "list" | "product" | "product_list" | "cta_url" | "text";
    header?: {
        type: "text" | "image" | "video" | "document" | "location";
        text?: string;
        image?: {
            link?: string;
            id?: string;
        };
        video?: {
            link?: string;
            id?: string;
        };
        document?: {
            link?: string;
            id?: string;
        };
    };
    body: {
        text: string;
    };
    footer?: {
        text: string;
    };
    action?: {
        parameters?: {
            display_text: string;
            url: string;
        };
        buttons?: Array<{
            type: "reply" | "url";
            reply?: {
                id: string;
                title: string;
            };
            url?: string;
            text?: string;
        }>;
        button?: string;
        sections?: Array<{
            title: string;
            rows: Array<{
                id: string;
                title: string;
                description?: string;
            }>;
        }>;
        catalog_id?: string;
        product_retailer_id?: string;
        name?: string;
    };
}
export interface ReactionData {
    message_id: string;
    emoji: string;
}
export interface MessagePayload {
    to: string;
    content?: string;
    template?: TemplateData;
    components?: Component[];
    files?: FileAttachment[];
    interactive?: InteractiveData;
    reaction?: ReactionData;
    context?: Context;
    embeds?: Embed[];
}
export interface MessageBodyPayload {
    messaging_product: string;
    recipient_type?: string;
    to: string;
    type: MessageType;
    context?: Context;
    text?: {
        body: string;
    };
    template?: {
        name: string;
        language: {
            code: LanguageCode;
        };
        components?: TemplateComponent[];
    };
    image?: {
        link?: string;
        id?: string;
        caption?: string;
    };
    document?: {
        link?: string;
        id?: string;
        caption?: string;
        filename?: string;
    };
    audio?: {
        link?: string;
        id?: string;
    };
    video?: {
        link?: string;
        id?: string;
        caption?: string;
    };
    sticker?: {
        link?: string;
        id?: string;
    };
    location?: LocationData;
    contacts?: ContactPayloadData[];
    interactive?: InteractiveData;
    reaction?: ReactionData;
}
export interface MessageApiResponse {
    messaging_product: string;
    contacts: ContactResponse[];
    messages: Message[];
}
export interface ContactResponse {
    input: string;
    wa_id: string;
}
export interface Message {
    id: string;
    status?: "sent" | "delivered" | "read" | "failed";
    timestamp?: string;
}
export interface Context {
    message_id: string;
}
