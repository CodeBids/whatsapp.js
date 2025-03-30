import { apiRequest } from "../../services/wa-api-cloud.service";
import {
  MessageApiResponse,
  MessagePayload,
  MessageBodyPayload,
  LanguageCode
} from "../../types";
import { Client } from "../Client";

export class Message {
  private client: Client;
  private baseUrl: string;
  private accessToken: string;

  constructor(client: Client, baseUrl: string = "", accessToken: string = "") {
    this.client = client;
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  async send({
    to,
    content,
    template,
    components
  }: MessagePayload): Promise<MessageApiResponse> {
    let body: MessageBodyPayload;

    if (content && template) {
      throw new Error(
        "You can only send either content or template, not both."
      );
    }

    if (content) {
      body = {
        messaging_product: "whatsapp",
        to,
        type: 'text',
        text: {
          body: content,
        },
      };
    } else if (template) {

      if(!template.name) {
        throw new Error("Template name is required.");
      } 

      if(!template.language) {
        throw new Error("Template language is required.");
      }

      if (!Object.values(LanguageCode).includes(template.language as LanguageCode)) {
        throw new Error(`Invalid template language: ${template.language}. Allowed languages are: ${Object.values(LanguageCode).join(", ")}.`);
      }

      body = {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template.name,
          language: {
            code: template.language!,
          },
        },
      };
    } else if (components) {
      console.log(components)

      body = {
        messaging_product: "whatsapp",
        to,
        type: 'text',
        text: {
          body: 'Hola desde componentes, ' + components ,
        },
      };
    } else {
      throw new Error("You must provide either content or template.");
    }

    return await apiRequest(
      `${this.baseUrl}/messages`,
      "POST",
      this.accessToken,
      body
    );
  }
}
