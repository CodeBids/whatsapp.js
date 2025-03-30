export async function apiRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', accessToken: string, data?: unknown): Promise<T> {
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
  })
}
