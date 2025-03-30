import { LanguageCode } from "./language";

export interface MessagePayload {
  to: string;
  content?: string;
  template?: {
    name: string;
    language?: LanguageCode;
  };
}

export interface MessageBodyPayload {
  messaging_product: string;
  to: string;
  type: 'text' | 'template';
  text?: {
    body: string;
  };
  template?: {
    name: string;
    language: {
      code: LanguageCode;
    };
  };
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
}
