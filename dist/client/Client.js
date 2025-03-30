var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiRequest } from '../services/wa-api-cloud.service';
import { Message } from './actions/Message';
/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
export class Client {
    constructor({ phoneId, accessToken, version }) {
        this.name = null;
        this.quality = null;
        this.id = null;
        this.displayPhoneNumber = null;
        if (!phoneId || !accessToken || !version) {
            throw new Error('Phone ID, Access Token and Version are required');
        }
        if (!/^\d+$/.test(phoneId)) {
            throw new Error('Phone ID must be a numeric string');
        }
        if (!/^[A-Za-z0-9]+$/.test(accessToken)) {
            throw new Error('Access Token must be alphanumeric');
        }
        if (version !== 'v22.0') {
            throw new Error('Version must be v22.0');
        }
        this.phoneId = phoneId;
        this.accessToken = accessToken;
        this.version = version;
        this.message = new Message(this, this.getBaseUrl(), this.accessToken); // Inicializar la propiedad message
        this.initializeClientData().catch((error) => {
            console.error('Error initializing client data:', error);
        });
    }
    getBaseUrl() {
        return `https://graph.facebook.com/${this.version}/${this.phoneId}`;
    }
    initializeClientData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield apiRequest(this.getBaseUrl(), 'GET', this.accessToken).then((data) => {
                this.name = data.verified_name;
                this.quality = data.quality_rating;
                this.id = data.id;
                this.displayPhoneNumber = data.display_phone_number;
            });
        });
    }
    getBusinessProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getBaseUrl()}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`;
            return yield apiRequest(url, 'GET', this.accessToken);
        });
    }
}
//# sourceMappingURL=Client.js.map