import type { CreateQrCodeParams, QrCodeListResponse, QrCodeRecord, QrCodeSuccessResponse } from "../../types";
import type { Client } from "../Client";
/**
 * Manages click-to-chat QR codes and short links for the phone number, via the
 * `message_qrdls` endpoint.
 */
export declare class QrCodeManager {
    private client;
    constructor(client: Client);
    private validatePrefilledMessage;
    /**
     * Creates a new QR code / short link that opens a chat pre-filled with a message.
     * @param params The pre-filled message and optional QR image format
     * @returns The created QR code record
     */
    create(params: CreateQrCodeParams): Promise<QrCodeRecord>;
    /**
     * Lists every QR code / short link created for the phone number.
     * @returns The list of QR codes
     */
    list(): Promise<QrCodeListResponse>;
    /**
     * Gets a single QR code by its code ID.
     * @param codeId QR code ID
     * @returns The QR code record
     */
    get(codeId: string): Promise<QrCodeRecord>;
    /**
     * Updates the pre-filled message of an existing QR code. The code and link stay the same.
     * @param codeId QR code ID
     * @param prefilledMessage New pre-filled message
     * @returns The updated QR code record
     */
    update(codeId: string, prefilledMessage: string): Promise<QrCodeRecord>;
    /**
     * Deletes a QR code / short link.
     * @param codeId QR code ID
     * @returns API response
     */
    delete(codeId: string): Promise<QrCodeSuccessResponse>;
}
