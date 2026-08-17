import type {
  CallActionResponse,
  CallingSettings,
  CallSettingsSuccessResponse,
  CallSdpSession,
  GetCallingSettingsResponse,
  InitiateCallResponse,
} from "../../types"
import { WhatsAppApiException } from "../../errors/Messages"
import type { Client } from "../Client"

/**
 * Manages WhatsApp Business Calling: initiating and controlling calls, and calling
 * settings, via the `calls` and `settings` endpoints.
 *
 * The Calling API is a newer, still-evolving part of the Cloud API — treat this manager
 * as beta. Method shapes follow Meta's published documentation as closely as possible,
 * but field names/behavior may still change on Meta's side.
 */
export class CallingManager {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  /**
   * Initiates a business-to-user call.
   * @param to Recipient's WhatsApp ID (phone number, international format, no leading "+")
   * @param session Optional SDP offer to send with the call request
   * @returns The initiated call's ID
   */
  async connect(to: string, session?: CallSdpSession): Promise<InitiateCallResponse> {
    if (!to) {
      throw new WhatsAppApiException("Recipient phone number is required", 0)
    }

    return this.client.makeApiRequest<InitiateCallResponse>("calls", "POST", {
      messaging_product: "whatsapp",
      to,
      action: "connect",
      ...(session ? { session } : {}),
    })
  }

  /**
   * Sends a pre-accept SDP answer for an incoming call, before fully accepting it.
   * @param callId Call ID, from the incoming `calls` webhook event
   * @param session SDP answer
   * @returns API response
   */
  async preAccept(callId: string, session: CallSdpSession): Promise<CallActionResponse> {
    return this.sendAction(callId, "pre_accept", session)
  }

  /**
   * Accepts an incoming call.
   * @param callId Call ID, from the incoming `calls` webhook event
   * @param session SDP answer
   * @returns API response
   */
  async accept(callId: string, session: CallSdpSession): Promise<CallActionResponse> {
    return this.sendAction(callId, "accept", session)
  }

  /**
   * Rejects an incoming call.
   * @param callId Call ID, from the incoming `calls` webhook event
   * @returns API response
   */
  async reject(callId: string): Promise<CallActionResponse> {
    return this.sendAction(callId, "reject")
  }

  /**
   * Terminates an ongoing call.
   * @param callId Call ID
   * @returns API response
   */
  async terminate(callId: string): Promise<CallActionResponse> {
    return this.sendAction(callId, "terminate")
  }

  private async sendAction(
    callId: string,
    action: "pre_accept" | "accept" | "reject" | "terminate",
    session?: CallSdpSession,
  ): Promise<CallActionResponse> {
    if (!callId) {
      throw new WhatsAppApiException("callId is required", 0)
    }

    return this.client.makeApiRequest<CallActionResponse>("calls", "POST", {
      messaging_product: "whatsapp",
      call_id: callId,
      action,
      ...(session ? { session } : {}),
    })
  }

  /**
   * Gets the phone number's current calling settings.
   * @returns The calling settings, if calling has been configured for this number
   */
  async getSettings(): Promise<CallingSettings | undefined> {
    const response = await this.client.makeApiRequest<GetCallingSettingsResponse>(
      "settings?fields=calling",
      "GET",
    )

    return response.calling
  }

  /**
   * Updates the phone number's calling settings.
   * @param settings Settings to update
   * @returns API response
   */
  async updateSettings(settings: CallingSettings): Promise<CallSettingsSuccessResponse> {
    if (!settings || Object.keys(settings).length === 0) {
      throw new WhatsAppApiException("Provide at least one setting to update", 0)
    }

    return this.client.makeApiRequest<CallSettingsSuccessResponse>("settings", "POST", {
      calling: settings,
    })
  }
}
