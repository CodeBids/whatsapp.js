"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberManager = void 0;
const Messages_1 = require("../../errors/Messages");
const DEFAULT_LIST_FIELDS = [
    "id",
    "display_phone_number",
    "verified_name",
    "quality_rating",
    "code_verification_status",
    "platform_type",
    "throughput",
];
const DEFAULT_DETAIL_FIELDS = [...DEFAULT_LIST_FIELDS, "name_status", "is_official_business_account"];
/**
 * Manages WhatsApp Business phone numbers: listing, registration, verification, and
 * two-step verification, via the Business Management API.
 */
class PhoneNumberManager {
    constructor(client) {
        this.client = client;
    }
    /**
     * Resolves which phone number ID to operate on, defaulting to the client's own number.
     */
    resolveId(phoneNumberId) {
        return phoneNumberId || this.client.getPhoneId();
    }
    /**
     * Lists every phone number on the WhatsApp Business Account.
     * Requires `wabaId` to be set on the Client.
     * @param params Filtering and pagination options
     * @returns The list of phone numbers
     */
    async list(params = {}) {
        const wabaId = this.client.getWabaId();
        if (!wabaId) {
            throw new Messages_1.WhatsAppApiException("A wabaId is required to list phone numbers. Pass it when creating the Client.", 0);
        }
        const query = new URLSearchParams();
        query.set("fields", (params.fields ?? DEFAULT_LIST_FIELDS).join(","));
        if (params.accountMode)
            query.set("account_mode", params.accountMode);
        if (params.limit)
            query.set("limit", String(params.limit));
        if (params.after)
            query.set("after", params.after);
        if (params.before)
            query.set("before", params.before);
        return this.client.makeGraphRequest(`${wabaId}/phone_numbers?${query.toString()}`, "GET");
    }
    /**
     * Gets details for a single phone number.
     * @param phoneNumberId Phone number ID to look up; defaults to the client's own number
     * @param fields Fields to request
     * @returns The phone number details
     */
    async get(phoneNumberId, fields = DEFAULT_DETAIL_FIELDS) {
        const id = this.resolveId(phoneNumberId);
        const query = new URLSearchParams({ fields: fields.join(",") });
        return this.client.makeGraphRequest(`${id}?${query.toString()}`, "GET");
    }
    /**
     * Requests a verification code (via SMS or voice call) for a phone number that has
     * already been added but not yet verified.
     * @param params Delivery method and language for the code
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    async requestVerificationCode(params, phoneNumberId) {
        if (!params.codeMethod) {
            throw new Messages_1.WhatsAppApiException("codeMethod is required (SMS or VOICE)", 0);
        }
        if (!params.language) {
            throw new Messages_1.WhatsAppApiException("language is required (e.g. \"en\", \"es\")", 0);
        }
        const id = this.resolveId(phoneNumberId);
        return this.client.makeGraphRequest(`${id}/request_code`, "POST", {
            code_method: params.codeMethod,
            language: params.language,
        });
    }
    /**
     * Submits the verification code received via SMS/voice to complete phone number verification.
     * @param code Numeric verification code
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    async verifyCode(code, phoneNumberId) {
        if (!code) {
            throw new Messages_1.WhatsAppApiException("code is required", 0);
        }
        const id = this.resolveId(phoneNumberId);
        return this.client.makeGraphRequest(`${id}/verify_code`, "POST", { code });
    }
    /**
     * Registers a verified phone number for use with the Cloud API.
     * @param pin Six-digit two-step verification PIN for the number
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    async register(pin, phoneNumberId) {
        this.validatePin(pin);
        const id = this.resolveId(phoneNumberId);
        return this.client.makeGraphRequest(`${id}/register`, "POST", {
            messaging_product: "whatsapp",
            pin,
        });
    }
    /**
     * Deregisters a phone number from the Cloud API. The number stops being reachable through
     * this integration until it's registered again.
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    async deregister(phoneNumberId) {
        const id = this.resolveId(phoneNumberId);
        return this.client.makeGraphRequest(`${id}/deregister`, "POST");
    }
    /**
     * Sets or updates the two-step verification PIN for a phone number.
     * @param pin Six-digit PIN
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    async setTwoStepVerificationPin(pin, phoneNumberId) {
        this.validatePin(pin);
        const id = this.resolveId(phoneNumberId);
        return this.client.makeGraphRequest(id, "POST", { pin });
    }
    /**
     * Updates phone number settings, such as identity change notifications.
     * @param settings Settings to update
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    async updateSettings(settings, phoneNumberId) {
        const id = this.resolveId(phoneNumberId);
        const body = {};
        if (settings.userIdentityChange) {
            body.user_identity_change = { enable_identity_key_check: settings.userIdentityChange.enableIdentityKeyCheck };
        }
        return this.client.makeGraphRequest(`${id}/settings`, "POST", body);
    }
    validatePin(pin) {
        if (!pin || !/^\d{6}$/.test(pin)) {
            throw new Messages_1.WhatsAppApiException("PIN must be a 6-digit numeric string", 0);
        }
    }
}
exports.PhoneNumberManager = PhoneNumberManager;
