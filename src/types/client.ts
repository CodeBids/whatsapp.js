export interface ClientOptions {
  phoneId: string;
  accessToken: string;
  /**
   * WhatsApp Business Account ID. Required only for WABA-scoped features: listing every
   * phone number on the account, and managing message templates and Flows.
   */
  wabaId?: string;
  webhook?: {
    verifyToken: string
    port?: number
    autoStart?: boolean
    /**
     * App secret (found in the Meta App Dashboard). When provided, every incoming webhook
     * request is validated against its `X-Hub-Signature-256` header before being processed,
     * and requests with a missing or invalid signature are rejected with a 401 response.
     * Strongly recommended for any webhook endpoint reachable from the public internet.
     */
    appSecret?: string
  }
}

export interface ClientInfoResponse {
  data: Datum[];
}

export interface Datum {
  business_profile: BusinessProfile;
}

export interface BusinessProfile {
  messaging_product:   string;
  address?:             string;
  description?:         string;
  vertical:            string;
  about:               string;
  email?:               string;
  websites?:            string[];
  profile_picture_url?: string;
}

export interface ClientData {
  verified_name:            string;
  code_verification_status: string;
  display_phone_number:     string;
  quality_rating:           string;
  platform_type:            string;
  throughput:               Throughput;
  id:                       string;
}

export interface Throughput {
  level: string;
}

export interface BusinessProfileUpdate {
  about?: string
  address?: string
  description?: string
  email?: string
  profile_picture_url?: string
  websites?: string[]
  vertical?: string
}
