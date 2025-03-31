import { apiRequest } from "../../services/wa-api-cloud.service";
import {
  type MessageApiResponse,
  type MessagePayload,
  type MessageBodyPayload,
  LanguageCode,
  Component,
} from "../../types/index";
import { WhatsAppApiException } from "../../errors/Messages";
import { LocationCard } from "../..";
import { ContactCard } from "../../builders/ContactCard";

export class Message {
  private baseUrl: string;
  private accessToken: string;

  constructor(baseUrl = "", accessToken = "") {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  /**
   * Sends a message through the WhatsApp API with flexible content options
   * @param payload Message payload with various content options
   * @returns API response
   */
  async send(payload: MessagePayload): Promise<MessageApiResponse> {
    // Validate the payload
    this.validatePayload(payload);

    // Determine the message type and build the body
    const body = this.buildMessageBody(payload);

    // Send the request to the API
    return await apiRequest(
      `${this.baseUrl}/messages`,
      "POST",
      this.accessToken,
      body
    );
  }

  /**
   * Validates the message payload
   * @param payload Message payload
   */
  private validatePayload(payload: MessagePayload): void {
    // Check if recipient is provided
    if (!payload.to) {
      throw new WhatsAppApiException("Recipient phone number is required", 0);
    }

    // Check if at least one content type is provided
    const hasContent = Boolean(
      payload.content ||
        payload.template ||
        (payload.files && payload.files.length > 0) ||
        payload.interactive ||
        payload.reaction ||
        (payload.components && payload.components.length > 0)
    );

    if (!hasContent) {
      throw new WhatsAppApiException(
        "At least one content type is required (text, template, files, interactive, reaction, or components)",
        0
      );
    }

    // Validate template if provided
    if (payload.template) {
      if (!payload.template.name) {
        throw new WhatsAppApiException("Template name is required", 0);
      }

      if (!payload.template.language) {
        throw new WhatsAppApiException("Template language is required", 0);
      }

      if (!Object.values(LanguageCode).includes(payload.template.language)) {
        throw new WhatsAppApiException(
          `Invalid template language: ${
            payload.template.language
          }. Allowed languages are: ${Object.values(LanguageCode).join(", ")}.`,
          0
        );
      }
    }

    // Validate files if provided
    if (payload.files && payload.files.length > 0) {
      for (const file of payload.files) {
        if (!file.type) {
          throw new WhatsAppApiException("File type is required", 0);
        }

        if (!file.url && !file.id) {
          throw new WhatsAppApiException(
            "Either file URL or ID must be provided",
            0
          );
        }
      }
    }

    // Validate reaction if provided
    if (payload.reaction) {
      if (!payload.reaction.message_id) {
        throw new WhatsAppApiException(
          "Message ID is required for reaction messages",
          0
        );
      }

      if (!payload.reaction.emoji) {
        throw new WhatsAppApiException(
          "Emoji is required for reaction messages",
          0
        );
      }
    }
  }

  /**
   * Validates the Component payload
   * @param component Component
   */
  private  validateComponent(component: Component) {
    switch (true) {
      case component instanceof LocationCard:
        if (component.latitude === undefined || component.longitude === undefined) {
          throw new WhatsAppApiException(
            "Latitude and longitude are required for location messages",
            0
          );
        }
        break;
  
      case component instanceof ContactCard:
        if (!component.firstName || !component.phones[0].number) {
          throw new WhatsAppApiException("Name and phone number are required", 0);
        }
        break;
  
      default:
        throw new WhatsAppApiException("Unknown component type", 0);
    }
  }
  
  /**
   * Builds the message body based on the provided payload
   * @param payload Message payload
   * @returns Message body for the API
   */
  private buildMessageBody(payload: MessagePayload): MessageBodyPayload {
    // Initialize the message body with common properties
    const messageBody: Partial<MessageBodyPayload> = {
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
    } else if (payload.files && payload.files.length > 0) {
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
    } else if (payload.interactive) {
      messageBody.type = "interactive";
      messageBody.interactive = payload.interactive;
    }
    if (payload.reaction) {
      messageBody.type = "reaction";
      messageBody.reaction = payload.reaction;
    } else if (payload.content) {
      messageBody.type = "text";
      messageBody.text = {
        body: payload.content,
      };
    } else if (payload.components) {
      payload.components.forEach((component) => {
        if (component instanceof LocationCard) {
          messageBody.type = "location";
          messageBody.location = {
            latitude: component.latitude,
            longitude: component.longitude,
            ...(component.name ? { name: component.name } : {}),
            ...(component.address ? { address: component.address } : {}),
          };
        } else if (component instanceof ContactCard) {
          messageBody.type = "contacts";

          // TODO: Agregar todos los objetos correspondientes, no usar ...[...] >:|

          messageBody.contacts = [
            {
              name: {
                formatted_name: component.firstName,
                first_name: component.firstName,
              },
              phones: [
                {
                  phone: component.phones[0].number.toString(),
                  wa_id: component.phones[0].wa_id.toString() ?? component.phones[0].number.toString(),
                },
              ],
            },
          ];
        } else {
          throw new WhatsAppApiException("Unsupported component type", 0);
        }
      });
    } else {
      // If we reach here, something went wrong with validation
      throw new WhatsAppApiException("Invalid message payload", 0);
    }

    return messageBody as MessageBodyPayload;
  }
}
