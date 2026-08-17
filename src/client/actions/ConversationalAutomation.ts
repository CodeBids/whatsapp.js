import type {
  ConversationalAutomationSettings,
  ConversationalAutomationSuccessResponse,
  GetConversationalAutomationResponse,
  UpdateConversationalAutomationPayload,
} from "../../types"
import { WhatsAppApiException } from "../../errors/Messages"
import type { Client } from "../Client"

/**
 * Manages Conversational Components for the phone number: the welcome message shown
 * on a user's first chat, slash-style commands, and ice breaker prompts.
 */
export class ConversationalAutomationManager {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  /**
   * Gets the current Conversational Components configuration.
   * @returns The welcome message toggle, commands, and prompts currently configured
   */
  async get(): Promise<ConversationalAutomationSettings> {
    const response = await this.client.makeApiRequest<GetConversationalAutomationResponse>(
      "?fields=conversational_automation",
      "GET",
    )

    return response.conversational_automation
  }

  /**
   * Updates the Conversational Components configuration. Only the fields provided are changed.
   * @param settings Fields to update
   * @returns API response
   */
  async update(settings: UpdateConversationalAutomationPayload): Promise<ConversationalAutomationSuccessResponse> {
    if (
      settings.enableWelcomeMessage === undefined &&
      settings.commands === undefined &&
      settings.prompts === undefined
    ) {
      throw new WhatsAppApiException("Provide at least one field to update", 0)
    }

    if (settings.commands) {
      for (const command of settings.commands) {
        if (!command.command_name || !command.command_description) {
          throw new WhatsAppApiException(
            "Each command requires a command_name and a command_description",
            0,
          )
        }
      }
    }

    const body: Record<string, unknown> = {}

    if (settings.enableWelcomeMessage !== undefined) {
      body.enable_welcome_message = settings.enableWelcomeMessage
    }
    if (settings.commands) {
      body.commands = settings.commands
    }
    if (settings.prompts) {
      body.prompts = settings.prompts
    }

    return this.client.makeApiRequest<ConversationalAutomationSuccessResponse>(
      "conversational_automation",
      "POST",
      body,
    )
  }
}
