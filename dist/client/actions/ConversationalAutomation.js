"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationalAutomationManager = void 0;
const Messages_1 = require("../../errors/Messages");
/**
 * Manages Conversational Components for the phone number: the welcome message shown
 * on a user's first chat, slash-style commands, and ice breaker prompts.
 */
class ConversationalAutomationManager {
    constructor(client) {
        this.client = client;
    }
    /**
     * Gets the current Conversational Components configuration.
     * @returns The welcome message toggle, commands, and prompts currently configured
     */
    async get() {
        const response = await this.client.makeApiRequest("?fields=conversational_automation", "GET");
        return response.conversational_automation;
    }
    /**
     * Updates the Conversational Components configuration. Only the fields provided are changed.
     * @param settings Fields to update
     * @returns API response
     */
    async update(settings) {
        if (settings.enableWelcomeMessage === undefined &&
            settings.commands === undefined &&
            settings.prompts === undefined) {
            throw new Messages_1.WhatsAppApiException("Provide at least one field to update", 0);
        }
        if (settings.commands) {
            for (const command of settings.commands) {
                if (!command.command_name || !command.command_description) {
                    throw new Messages_1.WhatsAppApiException("Each command requires a command_name and a command_description", 0);
                }
            }
        }
        const body = {};
        if (settings.enableWelcomeMessage !== undefined) {
            body.enable_welcome_message = settings.enableWelcomeMessage;
        }
        if (settings.commands) {
            body.commands = settings.commands;
        }
        if (settings.prompts) {
            body.prompts = settings.prompts;
        }
        return this.client.makeApiRequest("conversational_automation", "POST", body);
    }
}
exports.ConversationalAutomationManager = ConversationalAutomationManager;
