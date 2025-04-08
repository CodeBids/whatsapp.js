import type { LanguageCode } from "./language"
import type { LocationBuilder } from "../models/Location"
import { ContactBuilder } from "../models/Contact"
import { ContactPayloadData, Embed } from ".";
import { ButtonBuilder } from "../models/Button";

// Message types supported by WhatsApp
export type MessageType =
  | "text"
  | "template"
  | "image"
  | "document"
  | "audio"
  | "video"
  | "sticker"
  | "location"
  | "contacts"
  | "interactive"
  | "reaction"

// Components for interactive messages and templates
export type Component = Embed | LocationBuilder | ContactBuilder | ButtonBuilder;
//   embed?: Embed
//   button?: Button
//   location?: LocationCard
//   type?: "header" | "body" | "button" | "footer"
//   parameters?: TemplateParameter[]
// }

// Media file types
export interface FileAttachment {
  type: "audio" | "image" | "document" | "sticker" | "video"
  url?: string
  id?: string
  caption?: string
  filename?: string
}

// Location data
export interface LocationData {
  latitude: number
  longitude: number
  name?: string
  address?: string
}

// Template data
export interface TemplateData {
  name: string
  language: LanguageCode
  // components?: Component[] // ? I should make it compatible to send components and templates? I should... 
}

// Interactive data
export interface InteractiveData {
  type: "button" | "list" | "product" | "product_list" | "cta_url" | "text"
  header?: {
    type: "text" | "image" | "video" | "document" | "location"
    text?: string
    image?: {
      link?: string
      id?: string
    }
    video?: {
      link?: string
      id?: string
    }
    document?: {
      link?: string
      id?: string
    }
  }
  body: {
    text: string
  }
  footer?: {
    text: string
  }
  action?: {
    buttons?: Array<{
      type: "reply" | "url"
      reply?: {
        id: string
        title: string
      },
      url?: string
      text?: string
    }>
    button?: string
    sections?: Array<{
      title: string
      rows: Array<{
        id: string
        title: string
        description?: string
      }>
    }>
    catalog_id?: string
    product_retailer_id?: string
  }
}

// Reaction data
export interface ReactionData {
  message_id: string
  emoji: string
}

// Unified message payload that allows combining different content types
export interface MessagePayload {
  to: string
  content?: string
  template?: TemplateData
  components?: Component[]
  files?: FileAttachment[]
  interactive?: InteractiveData
  reaction?: ReactionData,
  context?: Context,
  embeds?: Embed[],
}

// Template components
export interface TemplateParameter {
  type: "text" | "currency" | "date_time" | "image" | "document" | "video"
  text?: string
  currency?: {
    code: string
    amount: number
  }
  date_time?: {
    fallback_value: string
  }
  image?: {
    link: string
  }
  document?: {
    link: string
  }
  video?: {
    link: string
  }
}

// Message body structure for the API
export interface MessageBodyPayload {
  messaging_product: string
  to: string
  type: MessageType
  context?: Context 
  text?: {
    body: string
  }
  template?: {
    name: string
    language: {
      code: LanguageCode
    }
    components?: Component[]
  }
  image?: {
    link?: string
    id?: string
    caption?: string
  }
  document?: {
    link?: string
    id?: string
    caption?: string
    filename?: string
  }
  audio?: {
    link?: string
    id?: string
  }
  video?: {
    link?: string
    id?: string
    caption?: string
  }
  sticker?: {
    link?: string
    id?: string
  }
  location?: LocationData
  contacts?: ContactPayloadData[]
  interactive?: InteractiveData
  reaction?: ReactionData
}

// API response
export interface MessageApiResponse {
  messaging_product: string
  contacts: ContactResponse[]
  messages: Message[]
}

// Contact structure for API response
export interface ContactResponse {
  input: string
  wa_id: string
}

// Message structure for API response
export interface Message {
  id: string
  status?: "sent" | "delivered" | "read" | "failed"
  timestamp?: string
}

export interface Context { 
  message_id: string;
}
