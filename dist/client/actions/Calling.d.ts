import type { CallActionResponse, CallingSettings, CallSettingsSuccessResponse, CallSdpSession, InitiateCallResponse } from "../../types";
import type { Client } from "../Client";
/**
 * Manages WhatsApp Business Calling: initiating and controlling calls, and calling
 * settings, via the `calls` and `settings` endpoints.
 *
 * The Calling API is a newer, still-evolving part of the Cloud API — treat this manager
 * as beta. Method shapes follow Meta's published documentation as closely as possible,
 * but field names/behavior may still change on Meta's side.
 */
export declare class CallingManager {
    private client;
    constructor(client: Client);
    /**
     * Initiates a business-to-user call.
     * @param to Recipient's WhatsApp ID (phone number, international format, no leading "+")
     * @param session Optional SDP offer to send with the call request
     * @returns The initiated call's ID
     */
    connect(to: string, session?: CallSdpSession): Promise<InitiateCallResponse>;
    /**
     * Sends a pre-accept SDP answer for an incoming call, before fully accepting it.
     * @param callId Call ID, from the incoming `calls` webhook event
     * @param session SDP answer
     * @returns API response
     */
    preAccept(callId: string, session: CallSdpSession): Promise<CallActionResponse>;
    /**
     * Accepts an incoming call.
     * @param callId Call ID, from the incoming `calls` webhook event
     * @param session SDP answer
     * @returns API response
     */
    accept(callId: string, session: CallSdpSession): Promise<CallActionResponse>;
    /**
     * Rejects an incoming call.
     * @param callId Call ID, from the incoming `calls` webhook event
     * @returns API response
     */
    reject(callId: string): Promise<CallActionResponse>;
    /**
     * Terminates an ongoing call.
     * @param callId Call ID
     * @returns API response
     */
    terminate(callId: string): Promise<CallActionResponse>;
    private sendAction;
    /**
     * Gets the phone number's current calling settings.
     * @returns The calling settings, if calling has been configured for this number
     */
    getSettings(): Promise<CallingSettings | undefined>;
    /**
     * Updates the phone number's calling settings.
     * @param settings Settings to update
     * @returns API response
     */
    updateSettings(settings: CallingSettings): Promise<CallSettingsSuccessResponse>;
}
