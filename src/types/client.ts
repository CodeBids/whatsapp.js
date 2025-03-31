export interface ClientOptions {
  phoneId: string;
  accessToken: string;
  version: string;
  webhook?: {
    verifyToken: string
    port?: number
    autoStart?: boolean
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
