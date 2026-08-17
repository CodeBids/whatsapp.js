import type { ListPhoneNumbersParams, PhoneNumberDetails, PhoneNumberListResponse, RequestVerificationCodeParams, SuccessResponse, UpdatePhoneNumberSettingsPayload } from "../../types";
import type { Client } from "../Client";
/**
 * Manages WhatsApp Business phone numbers: listing, registration, verification, and
 * two-step verification, via the Business Management API.
 */
export declare class PhoneNumberManager {
    private client;
    constructor(client: Client);
    /**
     * Resolves which phone number ID to operate on, defaulting to the client's own number.
     */
    private resolveId;
    /**
     * Lists every phone number on the WhatsApp Business Account.
     * Requires `wabaId` to be set on the Client.
     * @param params Filtering and pagination options
     * @returns The list of phone numbers
     */
    list(params?: ListPhoneNumbersParams): Promise<PhoneNumberListResponse>;
    /**
     * Gets details for a single phone number.
     * @param phoneNumberId Phone number ID to look up; defaults to the client's own number
     * @param fields Fields to request
     * @returns The phone number details
     */
    get(phoneNumberId?: string, fields?: string[]): Promise<PhoneNumberDetails>;
    /**
     * Requests a verification code (via SMS or voice call) for a phone number that has
     * already been added but not yet verified.
     * @param params Delivery method and language for the code
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    requestVerificationCode(params: RequestVerificationCodeParams, phoneNumberId?: string): Promise<SuccessResponse>;
    /**
     * Submits the verification code received via SMS/voice to complete phone number verification.
     * @param code Numeric verification code
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    verifyCode(code: string, phoneNumberId?: string): Promise<SuccessResponse>;
    /**
     * Registers a verified phone number for use with the Cloud API.
     * @param pin Six-digit two-step verification PIN for the number
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    register(pin: string, phoneNumberId?: string): Promise<SuccessResponse>;
    /**
     * Deregisters a phone number from the Cloud API. The number stops being reachable through
     * this integration until it's registered again.
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    deregister(phoneNumberId?: string): Promise<SuccessResponse>;
    /**
     * Sets or updates the two-step verification PIN for a phone number.
     * @param pin Six-digit PIN
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    setTwoStepVerificationPin(pin: string, phoneNumberId?: string): Promise<SuccessResponse>;
    /**
     * Updates phone number settings, such as identity change notifications.
     * @param settings Settings to update
     * @param phoneNumberId Phone number ID; defaults to the client's own number
     * @returns API response
     */
    updateSettings(settings: UpdatePhoneNumberSettingsPayload, phoneNumberId?: string): Promise<SuccessResponse>;
    private validatePin;
}
