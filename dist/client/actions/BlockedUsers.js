"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedUsersManager = void 0;
const Messages_1 = require("../../errors/Messages");
/**
 * Manages the phone number's block list: blocking/unblocking users and listing who's
 * currently blocked, via the `block_users` endpoint. Blocked users can't send messages
 * to, or receive messages from, this phone number.
 */
class BlockedUsersManager {
    constructor(client) {
        this.client = client;
    }
    validateWaIds(waIds) {
        if (!waIds || waIds.length === 0) {
            throw new Messages_1.WhatsAppApiException("At least one WhatsApp ID is required", 0);
        }
    }
    /**
     * Blocks one or more users, by WhatsApp ID / phone number.
     * @param waIds WhatsApp IDs (phone numbers, international format, no leading "+")
     * @returns Which users were blocked and which failed, if any
     */
    async block(waIds) {
        this.validateWaIds(waIds);
        return this.client.makeApiRequest("block_users", "POST", {
            messaging_product: "whatsapp",
            block_users: waIds.map((user) => ({ user })),
        });
    }
    /**
     * Unblocks one or more previously blocked users.
     * @param waIds WhatsApp IDs (phone numbers, international format, no leading "+")
     * @returns Which users were unblocked
     */
    async unblock(waIds) {
        this.validateWaIds(waIds);
        return this.client.makeApiRequest("block_users", "DELETE", {
            messaging_product: "whatsapp",
            block_users: waIds.map((user) => ({ user })),
        });
    }
    /**
     * Lists users currently blocked by this phone number.
     * @param params Pagination options
     * @returns The list of blocked users
     */
    async list(params = {}) {
        const query = new URLSearchParams();
        if (params.limit)
            query.set("limit", String(params.limit));
        if (params.after)
            query.set("after", params.after);
        if (params.before)
            query.set("before", params.before);
        const queryString = query.toString();
        return this.client.makeApiRequest(queryString ? `block_users?${queryString}` : "block_users", "GET");
    }
}
exports.BlockedUsersManager = BlockedUsersManager;
