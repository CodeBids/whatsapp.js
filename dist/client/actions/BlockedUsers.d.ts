import type { BlockUsersResponse, ListBlockedUsersParams, ListBlockedUsersResponse, UnblockUsersResponse } from "../../types";
import type { Client } from "../Client";
/**
 * Manages the phone number's block list: blocking/unblocking users and listing who's
 * currently blocked, via the `block_users` endpoint. Blocked users can't send messages
 * to, or receive messages from, this phone number.
 */
export declare class BlockedUsersManager {
    private client;
    constructor(client: Client);
    private validateWaIds;
    /**
     * Blocks one or more users, by WhatsApp ID / phone number.
     * @param waIds WhatsApp IDs (phone numbers, international format, no leading "+")
     * @returns Which users were blocked and which failed, if any
     */
    block(waIds: string[]): Promise<BlockUsersResponse>;
    /**
     * Unblocks one or more previously blocked users.
     * @param waIds WhatsApp IDs (phone numbers, international format, no leading "+")
     * @returns Which users were unblocked
     */
    unblock(waIds: string[]): Promise<UnblockUsersResponse>;
    /**
     * Lists users currently blocked by this phone number.
     * @param params Pagination options
     * @returns The list of blocked users
     */
    list(params?: ListBlockedUsersParams): Promise<ListBlockedUsersResponse>;
}
