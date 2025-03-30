import { MessageApiResponse, MessagePayload } from "../../types";
import { Client } from "../Client";
export declare class Message {
    private client;
    private baseUrl;
    private accessToken;
    constructor(client: Client, baseUrl?: string, accessToken?: string);
    send({ to, content, template, }: MessagePayload): Promise<MessageApiResponse>;
}
