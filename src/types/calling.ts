// WhatsApp Business Calling API types
// https://developers.facebook.com/docs/whatsapp/cloud-api/calling
//
// NOTE: the Calling API is a newer, still-evolving part of the Cloud API. These types
// follow Meta's published shape as closely as possible, but field names/behavior may
// still change on Meta's side — treat this module as beta.

export type CallAction = "connect" | "pre_accept" | "accept" | "reject" | "terminate"

export interface CallSdpSession {
  sdp_type: "offer" | "answer"
  sdp: string
}

export interface InitiateCallResponse {
  messaging_product: "whatsapp"
  calls: Array<{ id: string }>
}

export interface CallActionResponse {
  messaging_product: "whatsapp"
  success?: boolean
  calls?: Array<{ id: string }>
}

export interface CallingSettings {
  status?: "ENABLED" | "DISABLED"
  call_icon_visibility?: "DEFAULT" | "DISABLE_ALL"
  callback_permission_status?: "ENABLED" | "DISABLED"
  [key: string]: unknown
}

export interface GetCallingSettingsResponse {
  id?: string
  calling?: CallingSettings
}

export interface CallSettingsSuccessResponse {
  success: boolean
}

/** Normalized shape of a single entry from the `calls` webhook field */
export interface IncomingCallEvent {
  id: string
  from: string
  to: string
  event: string
  timestamp?: string
  direction?: string
  session?: CallSdpSession
  [key: string]: unknown
}
