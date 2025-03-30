var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiRequest } from "../../services/wa-api-cloud.service";
import { LanguageCode } from "../../types";
export class Message {
    constructor(client, baseUrl = "", accessToken = "") {
        this.client = client;
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }
    send(_a) {
        return __awaiter(this, arguments, void 0, function* ({ to, content, template, }) {
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
                if (!Object.values(LanguageCode).includes(template.language)) {
                    throw new Error(`Invalid template language: ${template.language}. Allowed languages are: ${Object.values(LanguageCode).join(", ")}.`);
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
            return yield apiRequest(`${this.baseUrl}/messages`, "POST", this.accessToken, body);
        });
    }
}
//# sourceMappingURL=Message.js.map