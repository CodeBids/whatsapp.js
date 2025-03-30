"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = apiRequest;
async function apiRequest(url, method, accessToken, data) {
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
}
