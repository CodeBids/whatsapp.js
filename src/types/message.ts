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
  | "address_message"

// Components for interactive messages and templates
export type Component = Embed | LocationBuilder | ContactBuilder | ButtonBuilder;

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
  components?: TemplateComponent[]
}

// Add new interfaces for template components and parameters
export interface TemplateComponent {
  type: "header" | "body" | "button" | "footer"
  sub_type?: "quick_reply" | "url" | "CATALOG"
  index?: string | number
  parameters: TemplateParameter[]
}

// Update the TemplateParameter interface to include all parameter types
export interface TemplateParameter {
  type: "text" | "currency" | "date_time" | "image" | "document" | "video" | "payload" | "action"
  text?: string
  parameter_name?: string
  currency?: {
    fallback_value: string
    code: string
    amount_1000: number
  }
  date_time?: {
    fallback_value: string
    day_of_week?: number
    year?: number
    month?: number
    day_of_month?: number
    hour?: number
    minute?: number
    calendar?: "GREGORIAN"
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
  payload?: string
  action?: {
    thumbnail_product_retailer_id?: string
    catalog_id?: string
    product_retailer_id?: string
    link?: string
  }
}


// Interactive data
export interface InteractiveData {
  type: "button" | "list" | "product" | "product_list" | "cta_url" | "text" | "location_request_message" | "flow" | "address_message"
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
    parameters?: {
      display_text: string
      url: string
    }
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
    name?: string
    // Flow-specific properties
    flow_message_version?: string
    flow_token?: string
    flow_id?: string
    flow_cta?: string
    flow_action?: "navigate" | "data_exchange"
    flow_action_payload?: {
      screen?: string
      data?: Record<string, any>
    }
    // Product list
    sections_product_list?: Array<{
      title: string
      product_items: Array<{
        product_retailer_id: string
      }>
    }>
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
  recipient_type?: "individual" | "group"
  content?: string
  preview_url?: boolean
  template?: TemplateData
  components?: Component[]
  files?: FileAttachment[]
  interactive?: InteractiveData
  reaction?: ReactionData,
  context?: Context,
  embeds?: Embed[],
  // New message types
  locationRequest?: {
    body: string
  }
  flow?: FlowData
  addressMessage?: AddressMessageData
  product?: ProductData
  productList?: {
    catalog_id: string
    header?: string
    body: string
    footer?: string
    sections: ProductListSection[]
  }
  biz_opaque_callback_data?: string
}

// Flow data
export interface FlowData {
  header?: string
  body: string
  footer?: string
  flow_id?: string
  flow_name?: string
  flow_cta: string
  flow_token?: string
  flow_message_version?: string
  flow_action?: "navigate" | "data_exchange"
  flow_action_payload?: {
    screen?: string
    data?: Record<string, any>
  }
  mode?: "draft" | "published"
}

// Address message data
export interface AddressMessageData {
  country: string
  values?: {
    name?: string
    phone_number?: string
    in_pin_code?: string
    floor_number?: string
    tower_number?: string
    building_name?: string
    address?: string
    landmark_area?: string
    city?: string
    state?: string
  }
  saved_addresses?: Array<{
    id: string
    value: {
      name?: string
      phone_number?: string
      in_pin_code?: string
      floor_number?: string
      tower_number?: string
      building_name?: string
      address?: string
      landmark_area?: string
      city?: string
      state?: string
    }
  }>
}

// Message body structure for the API
export interface MessageBodyPayload {
  messaging_product: string
  recipient_type?: string
  to: string
  type: MessageType
  context?: Context
  text?: {
    preview_url?: boolean
    body: string
  }
  template?: {
    name: string
    language: {
      code: LanguageCode
    }
    components?: TemplateComponent[]
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
  address_message?: {
    country: string
    values?: Record<string, string>
    saved_addresses?: Array<{
      id: string
      value: Record<string, string>
    }>
  }
  biz_opaque_callback_data?: string
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

// Media management types
export interface MediaUploadResponse {
  id: string
}

export interface MediaUrlResponse {
  messaging_product: string
  url: string
  mime_type: string
  sha256: string
  file_size: string
  id: string
}

export interface MediaDeleteResponse {
  success: boolean
}

// Typing indicator types
export interface TypingIndicatorPayload {
  messaging_product: string
  recipient_type: string
  to: string
  typing?: "typing"
  status?: "read"
  message_id?: string
}

// Address message types
export interface AddressMessagePayload {
  messaging_product: string
  recipient_type: string
  to: string
  type: "address_message"
  address_message: {
    country: string
    values?: {
      name?: string
      phone_number?: string
      in_pin_code?: string
      floor_number?: string
      tower_number?: string
      building_name?: string
      address?: string
      landmark_area?: string
      city?: string
      state?: string
    }
    saved_addresses?: Array<{
      id: string
      value: {
        name?: string
        phone_number?: string
        in_pin_code?: string
        floor_number?: string
        tower_number?: string
        building_name?: string
        address?: string
        landmark_area?: string
        city?: string
        state?: string
      }
    }>
  }
}

// Product message types
export interface ProductData {
  catalog_id: string
  product_retailer_id: string
}

export interface ProductListSection {
  title: string
  product_items: Array<{
    product_retailer_id: string
  }>
}
