import { ClientInfoResponse, ClientOptions } from '../types';
import { Message } from './actions/Message';
/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
export declare class Client {
    private phoneId;
    private accessToken;
    private version;
    name: string | null;
    quality: string | null;
    id: string | null;
    displayPhoneNumber: string | null;
    message: Message;
    constructor({ phoneId, accessToken, version }: ClientOptions);
    private getBaseUrl;
    private initializeClientData;
    getBusinessProfile(): Promise<ClientInfoResponse>;
}
