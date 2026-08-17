import type { ConversationalAutomationSettings, ConversationalAutomationSuccessResponse, UpdateConversationalAutomationPayload } from "../../types";
import type { Client } from "../Client";
/**
 * Manages Conversational Components for the phone number: the welcome message shown
 * on a user's first chat, slash-style commands, and ice breaker prompts.
 */
export declare class ConversationalAutomationManager {
    private client;
    constructor(client: Client);
    /**
     * Gets the current Conversational Components configuration.
     * @returns The welcome message toggle, commands, and prompts currently configured
     */
    get(): Promise<ConversationalAutomationSettings>;
    /**
     * Updates the Conversational Components configuration. Only the fields provided are changed.
     * @param settings Fields to update
     * @returns API response
     */
    update(settings: UpdateConversationalAutomationPayload): Promise<ConversationalAutomationSuccessResponse>;
}
