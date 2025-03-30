var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function apiRequest(url, method, accessToken, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : undefined,
            }).then((response) => {
                const status = response.status;
                if (!response.ok) {
                    throw new Error(`Error: ${status} ${response.statusText}`);
                }
                resolve(response.json());
            }).catch((error) => {
                reject(new Error(error.message));
            });
        });
    });
}
//# sourceMappingURL=wa-api-cloud.service.js.map