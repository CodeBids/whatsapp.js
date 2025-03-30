"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const wa_api_cloud_service_1 = require("../../services/wa-api-cloud.service");
const types_1 = require("../../types");
class Message {
    constructor(client, baseUrl = "", accessToken = "") {
        this.client = client;
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }
    async send({ to, content, template, }) {
        let body;
        if (content && template) {
            throw new Error("You can only send either content or template, not both.");
        }
        if (content) {
            body = {
                messaging_product: "whatsapp",
                to,
                text: {
                    body: content,
                },
            };
        }
        else if (template) {
            if (!template.name) {
                throw new Error("Template name is required.");
            }
            if (!template.language) {
                throw new Error("Template language is required.");
            }
            if (!Object.values(types_1.LanguageCode).includes(template.language)) {
                throw new Error(`Invalid template language: ${template.language}. Allowed languages are: ${Object.values(types_1.LanguageCode).join(", ")}.`);
            }
            body = {
                messaging_product: "whatsapp",
                to,
                template: {
                    name: template.name,
                    language: {
                        code: template.language,
                    },
                },
            };
        }
        else {
            throw new Error("You must provide either content or template.");
        }
        return await (0, wa_api_cloud_service_1.apiRequest)(`${this.baseUrl}/messages`, "POST", this.accessToken, body);
    }
}
exports.Message = Message;
