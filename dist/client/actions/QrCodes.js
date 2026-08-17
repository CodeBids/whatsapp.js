"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCodeManager = void 0;
const Messages_1 = require("../../errors/Messages");
const MAX_PREFILLED_MESSAGE_LENGTH = 140;
/**
 * Manages click-to-chat QR codes and short links for the phone number, via the
 * `message_qrdls` endpoint.
 */
class QrCodeManager {
    constructor(client) {
        this.client = client;
    }
    validatePrefilledMessage(message) {
        if (!message) {
            throw new Messages_1.WhatsAppApiException("prefilledMessage is required", 0);
        }
        if (message.length > MAX_PREFILLED_MESSAGE_LENGTH) {
            throw new Messages_1.WhatsAppApiException(`prefilledMessage must be ${MAX_PREFILLED_MESSAGE_LENGTH} characters or less`, 0);
        }
    }
    /**
     * Creates a new QR code / short link that opens a chat pre-filled with a message.
     * @param params The pre-filled message and optional QR image format
     * @returns The created QR code record
     */
    async create(params) {
        this.validatePrefilledMessage(params.prefilledMessage);
        return this.client.makeApiRequest("message_qrdls", "POST", {
            prefilled_message: params.prefilledMessage,
            ...(params.generateQrImage ? { generate_qr_image: params.generateQrImage } : {}),
        });
    }
    /**
     * Lists every QR code / short link created for the phone number.
     * @returns The list of QR codes
     */
    async list() {
        return this.client.makeApiRequest("message_qrdls", "GET");
    }
    /**
     * Gets a single QR code by its code ID.
     * @param codeId QR code ID
     * @returns The QR code record
     */
    async get(codeId) {
        if (!codeId) {
            throw new Messages_1.WhatsAppApiException("codeId is required", 0);
        }
        return this.client.makeApiRequest(`message_qrdls/${codeId}`, "GET");
    }
    /**
     * Updates the pre-filled message of an existing QR code. The code and link stay the same.
     * @param codeId QR code ID
     * @param prefilledMessage New pre-filled message
     * @returns The updated QR code record
     */
    async update(codeId, prefilledMessage) {
        if (!codeId) {
            throw new Messages_1.WhatsAppApiException("codeId is required", 0);
        }
        this.validatePrefilledMessage(prefilledMessage);
        return this.client.makeApiRequest("message_qrdls", "POST", {
            code: codeId,
            prefilled_message: prefilledMessage,
        });
    }
    /**
     * Deletes a QR code / short link.
     * @param codeId QR code ID
     * @returns API response
     */
    async delete(codeId) {
        if (!codeId) {
            throw new Messages_1.WhatsAppApiException("codeId is required", 0);
        }
        return this.client.makeApiRequest(`message_qrdls/${codeId}`, "DELETE");
    }
}
exports.QrCodeManager = QrCodeManager;
