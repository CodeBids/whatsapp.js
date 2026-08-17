// QR Codes / short links types
// https://developers.facebook.com/docs/whatsapp/business-management-api/qr-codes

export type QrCodeImageFormat = "SVG" | "PNG"

export interface QrCodeRecord {
  code: string
  prefilled_message: string
  deep_link_url: string
  qr_image_url?: string
}

export interface QrCodeListResponse {
  data: QrCodeRecord[]
}

export interface CreateQrCodeParams {
  /** Message pre-filled in the chat when a user scans the code or opens the link (max 140 characters) */
  prefilledMessage: string
  /** When provided, the response includes a qr_image_url in this image format */
  generateQrImage?: QrCodeImageFormat
}

export interface QrCodeSuccessResponse {
  success: boolean
}
