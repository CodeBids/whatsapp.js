// Phone Number management types (Business Management API)
// https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers

export type PhoneNumberAccountMode = "SANDBOX" | "LIVE"

export type PhoneNumberCodeVerificationStatus = "VERIFIED" | "NOT_VERIFIED" | "EXPIRED"

export interface PhoneNumberThroughput {
  level: string
}

/** A single phone number entry, as returned by the WABA phone number listing endpoint */
export interface PhoneNumberSummary {
  id: string
  display_phone_number: string
  verified_name: string
  quality_rating: string
  code_verification_status?: PhoneNumberCodeVerificationStatus
  platform_type?: string
  throughput?: PhoneNumberThroughput
  account_mode?: PhoneNumberAccountMode
}

/** Extended details for a single phone number */
export interface PhoneNumberDetails extends PhoneNumberSummary {
  name_status?: string
  new_name_status?: string
  is_official_business_account?: boolean
  is_pin_enabled?: boolean
}

export interface PhoneNumberPaging {
  cursors?: {
    before?: string
    after?: string
  }
  next?: string
  previous?: string
}

export interface PhoneNumberListResponse {
  data: PhoneNumberSummary[]
  paging?: PhoneNumberPaging
}

export interface ListPhoneNumbersParams {
  /** Filter by account mode. Omit to return numbers in every mode. */
  accountMode?: PhoneNumberAccountMode
  /** Fields to request; defaults to the library's standard field set when omitted. */
  fields?: string[]
  limit?: number
  after?: string
  before?: string
}

export type VerificationCodeMethod = "SMS" | "VOICE"

export interface RequestVerificationCodeParams {
  /** How the verification code should be delivered */
  codeMethod: VerificationCodeMethod
  /** Two-character language code for the verification message (e.g. "en", "es") */
  language: string
}

export interface UpdatePhoneNumberSettingsPayload {
  userIdentityChange?: {
    /** When true, WhatsApp notifies you if a contact's account changes phone/device */
    enableIdentityKeyCheck: boolean
  }
}

export interface SuccessResponse {
  success: boolean
}
