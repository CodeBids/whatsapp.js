"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallingManager = void 0;
const Messages_1 = require("../../errors/Messages");
/**
 * Manages WhatsApp Business Calling: initiating and controlling calls, and calling
 * settings, via the `calls` and `settings` endpoints.
 *
 * The Calling API is a newer, still-evolving part of the Cloud API — treat this manager
 * as beta. Method shapes follow Meta's published documentation as closely as possible,
 * but field names/behavior may still change on Meta's side.
 */
class CallingManager {
    constructor(client) {
        this.client = client;
    }
    /**
     * Initiates a business-to-user call.
     * @param to Recipient's WhatsApp ID (phone number, international format, no leading "+")
     * @param session Optional SDP offer to send with the call request
     * @returns The initiated call's ID
     */
    async connect(to, session) {
        if (!to) {
            throw new Messages_1.WhatsAppApiException("Recipient phone number is required", 0);
        }
        return this.client.makeApiRequest("calls", "POST", {
            messaging_product: "whatsapp",
            to,
            action: "connect",
            ...(session ? { session } : {}),
        });
    }
    /**
     * Sends a pre-accept SDP answer for an incoming call, before fully accepting it.
     * @param callId Call ID, from the incoming `calls` webhook event
     * @param session SDP answer
     * @returns API response
     */
    async preAccept(callId, session) {
        return this.sendAction(callId, "pre_accept", session);
    }
    /**
     * Accepts an incoming call.
     * @param callId Call ID, from the incoming `calls` webhook event
     * @param session SDP answer
     * @returns API response
     */
    async accept(callId, session) {
        return this.sendAction(callId, "accept", session);
    }
    /**
     * Rejects an incoming call.
     * @param callId Call ID, from the incoming `calls` webhook event
     * @returns API response
     */
    async reject(callId) {
        return this.sendAction(callId, "reject");
    }
    /**
     * Terminates an ongoing call.
     * @param callId Call ID
     * @returns API response
     */
    async terminate(callId) {
        return this.sendAction(callId, "terminate");
    }
    async sendAction(callId, action, session) {
        if (!callId) {
            throw new Messages_1.WhatsAppApiException("callId is required", 0);
        }
        return this.client.makeApiRequest("calls", "POST", {
            messaging_product: "whatsapp",
            call_id: callId,
            action,
            ...(session ? { session } : {}),
        });
    }
    /**
     * Gets the phone number's current calling settings.
     * @returns The calling settings, if calling has been configured for this number
     */
    async getSettings() {
        const response = await this.client.makeApiRequest("settings?fields=calling", "GET");
        return response.calling;
    }
    /**
     * Updates the phone number's calling settings.
     * @param settings Settings to update
     * @returns API response
     */
    async updateSettings(settings) {
        if (!settings || Object.keys(settings).length === 0) {
            throw new Messages_1.WhatsAppApiException("Provide at least one setting to update", 0);
        }
        return this.client.makeApiRequest("settings", "POST", {
            calling: settings,
        });
    }
}
exports.CallingManager = CallingManager;
