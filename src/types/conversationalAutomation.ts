// Conversational Components types (commands, ice breakers, welcome message)
// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-conversational-components

export interface ConversationalCommand {
  /** Shown to the user after a "/", e.g. "tickets" */
  command_name: string
  command_description: string
}

export interface ConversationalAutomationSettings {
  enable_welcome_message: boolean
  commands: ConversationalCommand[]
  /** Ice breakers: shortcut prompts shown in a new chat */
  prompts: string[]
}

export interface GetConversationalAutomationResponse {
  id?: string
  conversational_automation: ConversationalAutomationSettings
}

export interface UpdateConversationalAutomationPayload {
  enableWelcomeMessage?: boolean
  commands?: ConversationalCommand[]
  prompts?: string[]
}

export interface ConversationalAutomationSuccessResponse {
  success: boolean
}
