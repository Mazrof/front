import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";

const server = "http://localhost:4000";

export async function getContactsList() {
    const request: ApiRequest = {
        endpoint: `${server}/contactsList`,
        method: "GET",
        cache: "no-store", // Avoid caching
    };
    return await apiHandler(request);
}
export async function getChatsList() {
    const request: ApiRequest = {
        endpoint: `${server}/chatsList`,
        method: "GET",
        cache: "no-store", // Avoid caching
    };
    return await apiHandler(request);
}
export async function sendQuery(query: string) {
    const request: ApiRequest = {
        endpoint: "https://retoolapi.dev/Ej9KTG/data",
        method: "POST",
        cache: "no-store", // Avoid caching
        body: JSON.stringify({ query }),
    };
    return await apiHandler(request);
}
export async function getApi() {
    const request: ApiRequest = {
        endpoint: "https://retoolapi.dev/Ej9KTG/data",
        method: "GET",
        cache: "no-store", // Avoid caching
    };
    return await apiHandler(request);
}
