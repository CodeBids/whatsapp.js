import type { LanguageCode } from "./language";
import type { AddressCard } from "../builders/AddressCard";
export type MessageType = "text" | "template" | "image" | "document" | "audio" | "video" | "sticker" | "location" | "contacts" | "interactive" | "reaction";
export interface Component {
    embed?: Embed;
    button?: Button;
    address?: AddressCard;
    type?: "header" | "body" | "button" | "footer";
    parameters?: TemplateParameter[];
}
export type Embed = {};
export type Button = {};
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
export interface ContactData {
    name: {
        formatted_name: string;
        first_name?: string;
        last_name?: string;
        middle_name?: string;
        suffix?: string;
        prefix?: string;
    };
    phones?: Array<{
        phone: string;
        type: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
        wa_id?: string;
    }>;
    emails?: Array<{
        email: string;
        type: "HOME" | "WORK";
    }>;
    addresses?: Array<{
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        country_code?: string;
        type: "HOME" | "WORK";
    }>;
    urls?: Array<{
        url: string;
        type: "HOME" | "WORK";
    }>;
    birthday?: string;
    org?: {
        company?: string;
        department?: string;
        title?: string;
    };
}
export interface TemplateData {
    name: string;
    language: LanguageCode;
    components?: Component[];
}
export interface InteractiveData {
    type: "button" | "list" | "product" | "product_list";
    header?: {
        type: "text" | "image" | "video" | "document";
        text?: string;
        image?: {
            link: string;
        };
        video?: {
            link: string;
        };
        document?: {
            link: string;
        };
    };
    body: {
        text: string;
    };
    footer?: {
        text: string;
    };
    action: {
        buttons?: Array<{
            type: "reply";
            reply: {
                id: string;
                title: string;
            };
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
    location?: LocationData;
    contacts?: ContactData[];
    interactive?: InteractiveData;
    reaction?: ReactionData;
}
export interface TemplateParameter {
    type: "text" | "currency" | "date_time" | "image" | "document" | "video";
    text?: string;
    currency?: {
        code: string;
        amount: number;
    };
    date_time?: {
        fallback_value: string;
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
}
export interface MessageBodyPayload {
    messaging_product: string;
    to: string;
    type: MessageType;
    text?: {
        body: string;
    };
    template?: {
        name: string;
        language: {
            code: LanguageCode;
        };
        components?: Component[];
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
    contacts?: ContactData[];
    interactive?: InteractiveData;
    reaction?: ReactionData;
}
export interface MessageApiResponse {
    messaging_product: string;
    contacts: Contact[];
    messages: Message[];
}
export interface Contact {
    input: string;
    wa_id: string;
}
export interface Message {
    id: string;
    status?: "sent" | "delivered" | "read" | "failed";
    timestamp?: string;
}
