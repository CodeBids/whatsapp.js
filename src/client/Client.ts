import { apiRequest } from '../services/wa-api-cloud.service';
import { ClientData, ClientInfoResponse, ClientOptions } from '../types';

import { Message } from './actions/Message';

/**
 * This is the starting point for any WhatsApp Client and the main hub for interacting with the WhatsApp API Cloud
 */

export class Client {
  private phoneId: string;
  private accessToken: string;
  private version: string;
  public name: string | null = null;
  public quality: string | null = null;
  public id: string | null = null;
  public displayPhoneNumber: string | null = null;

  public message: Message; // Añadir la propiedad message

  constructor({ phoneId, accessToken, version }: ClientOptions) {
    if (!phoneId || !accessToken || !version) {
      throw new Error('Phone ID, Access Token and Version are required');
    }

    if(!/^\d+$/.test(phoneId)) {
      throw new Error('Phone ID must be a numeric string');
    }

    if(!/^[A-Za-z0-9]+$/.test(accessToken)) {
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

  private getBaseUrl(): string {
    return `https://graph.facebook.com/${this.version}/${this.phoneId}`;
  }

  private async initializeClientData(): Promise<void> {
    return await apiRequest<ClientData>(this.getBaseUrl(), 'GET', this.accessToken).then((data) => {
      this.name = data.verified_name;
      this.quality = data.quality_rating;
      this.id = data.id;
      this.displayPhoneNumber = data.display_phone_number;
    });
  }

  public async getBusinessProfile(): Promise<ClientInfoResponse> {
    const url = `${this.getBaseUrl()}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`;
    return await apiRequest<ClientInfoResponse>(url, 'GET', this.accessToken);
  }

}