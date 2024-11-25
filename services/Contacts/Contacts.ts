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
