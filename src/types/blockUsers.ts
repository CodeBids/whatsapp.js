// Block Users API types
// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/block-users

export interface BlockUserEntry {
  /** WhatsApp ID / phone number in international format, without a leading "+" */
  user: string
}

export interface BlockUserError {
  user: string
  errors: Array<{ code: number; message: string }>
}

export interface BlockUsersResponse {
  messaging_product: "whatsapp"
  block_users: {
    added_users?: BlockUserEntry[]
    failed_users?: BlockUserError[]
  }
}

export interface UnblockUsersResponse {
  messaging_product: "whatsapp"
  block_users: {
    removed_users?: BlockUserEntry[]
  }
}

export interface BlockedUsersPaging {
  cursors?: {
    before?: string
    after?: string
  }
  next?: string
  previous?: string
}

export interface ListBlockedUsersParams {
  limit?: number
  after?: string
  before?: string
}

export interface ListBlockedUsersResponse {
  data: BlockUserEntry[]
  paging?: BlockedUsersPaging
}
