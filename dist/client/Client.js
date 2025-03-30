"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const wa_api_cloud_service_1 = require("../services/wa-api-cloud.service");
const Message_1 = require("./actions/Message");
/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */
class Client {
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
        this.message = new Message_1.Message(this.getBaseUrl(), this.accessToken);
        this.initializeClientData().catch((error) => {
            console.error('Error initializing client data:', error);
        });
    }
    getBaseUrl() {
        return `https://graph.facebook.com/${this.version}/${this.phoneId}`;
    }
    async initializeClientData() {
        return await (0, wa_api_cloud_service_1.apiRequest)(this.getBaseUrl(), 'GET', this.accessToken).then((data) => {
            this.name = data.verified_name;
            this.quality = data.quality_rating;
            this.id = data.id;
            this.displayPhoneNumber = data.display_phone_number;
        });
    }
    async getBusinessProfile() {
        const url = `${this.getBaseUrl()}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`;
        return await (0, wa_api_cloud_service_1.apiRequest)(url, 'GET', this.accessToken);
    }
}
exports.Client = Client;
