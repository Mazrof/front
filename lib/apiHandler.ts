import { ApiRequest } from '@/types/request';
async function apiHandler({ endpoint, method, headers, body, cache, revalidate }: ApiRequest) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            revalidate: revalidate ?? false,
            cache
        }
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || `An error occurred while Call this Endpoint: ${endpoint}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(`An error occurred while Call this Endpoint: ${endpoint}`);
        throw error;
    }
}
export default apiHandler;