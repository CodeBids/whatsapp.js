import type {
  BlockUsersResponse,
  ListBlockedUsersParams,
  ListBlockedUsersResponse,
  UnblockUsersResponse,
} from "../../types"
import { WhatsAppApiException } from "../../errors/Messages"
import type { Client } from "../Client"

/**
 * Manages the phone number's block list: blocking/unblocking users and listing who's
 * currently blocked, via the `block_users` endpoint. Blocked users can't send messages
 * to, or receive messages from, this phone number.
 */
export class BlockedUsersManager {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  private validateWaIds(waIds: string[]): void {
    if (!waIds || waIds.length === 0) {
      throw new WhatsAppApiException("At least one WhatsApp ID is required", 0)
    }
  }

  /**
   * Blocks one or more users, by WhatsApp ID / phone number.
   * @param waIds WhatsApp IDs (phone numbers, international format, no leading "+")
   * @returns Which users were blocked and which failed, if any
   */
  async block(waIds: string[]): Promise<BlockUsersResponse> {
    this.validateWaIds(waIds)

    return this.client.makeApiRequest<BlockUsersResponse>("block_users", "POST", {
      messaging_product: "whatsapp",
      block_users: waIds.map((user) => ({ user })),
    })
  }

  /**
   * Unblocks one or more previously blocked users.
   * @param waIds WhatsApp IDs (phone numbers, international format, no leading "+")
   * @returns Which users were unblocked
   */
  async unblock(waIds: string[]): Promise<UnblockUsersResponse> {
    this.validateWaIds(waIds)

    return this.client.makeApiRequest<UnblockUsersResponse>("block_users", "DELETE", {
      messaging_product: "whatsapp",
      block_users: waIds.map((user) => ({ user })),
    })
  }

  /**
   * Lists users currently blocked by this phone number.
   * @param params Pagination options
   * @returns The list of blocked users
   */
  async list(params: ListBlockedUsersParams = {}): Promise<ListBlockedUsersResponse> {
    const query = new URLSearchParams()

    if (params.limit) query.set("limit", String(params.limit))
    if (params.after) query.set("after", params.after)
    if (params.before) query.set("before", params.before)

    const queryString = query.toString()

    return this.client.makeApiRequest<ListBlockedUsersResponse>(
      queryString ? `block_users?${queryString}` : "block_users",
      "GET",
    )
  }
}
