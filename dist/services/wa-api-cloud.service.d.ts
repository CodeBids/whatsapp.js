export declare function apiRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', accessToken: string, data?: unknown): Promise<T>;
