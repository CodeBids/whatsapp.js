import { LanguageCode } from "./language";

import { AddressCard } from "../builders/AddressCard";

export interface MessagePayload {
  to: string;
  content?: string;
  template?: {
    name: string;
    language?: LanguageCode;
  };
  components: Component[]
}

export interface Component {
  embed?: Embed;
  button?: Button;
  address?: AddressCard;
}

export interface Embed {

}

export interface Button {

}

export interface File {
audio?: Audio;
image?: Image;
document?: Document;
contactCard?: ContactCard;
sticker?: Sticker;
video?: Video;
}

export interface Audio {

}

export interface Image {

}

export interface Video {

}

export interface Document {

}

export interface ContactCard {

}

export interface Sticker {

}



export interface MessageBodyPayload {
  messaging_product: string;
  to: string;
  type: 'text' | 'template' | 'interactive';
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
