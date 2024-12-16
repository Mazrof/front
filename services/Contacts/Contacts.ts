import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";

const server = "http://localhost:4000";

export async function getContactsList() {
    const request: ApiRequest = {
        endpoint: `${server}/contactsList`,
        method: "GET",
        cache: "no-store", // Avoid caching
        // credentials: "include",
    };
    return await apiHandler(request);
}
export async function getChatsList() {
    const request: ApiRequest = {
        endpoint: `${server}/chatsList`,
        method: "GET",
        cache: "no-store", // Avoid caching
        // credentials: "include",
    };
    return await apiHandler(request);
}
export async function getChatsListtest() {
    const request: ApiRequest = {
        endpoint: `http://localhost:3000/api/v1/chats/my-chats`,
        method: "GET",
        cache: "no-store", // Avoid caching
        credentials: "include",
    };
    return await apiHandler(request);
}
// export async function sendQuery(query: string) {
//     const request: ApiRequest = {
//         endpoint: "https://retoolapi.dev/Ej9KTG/data",
//         method: "POST",
//         cache: "no-store", // Avoid caching
//         body: JSON.stringify({ query }),
//
// credentials:"include",     };
//     return await apiHandler(request);
// }
// export async function getApi() {
//     const request: ApiRequest = {
//         endpoint: "https://retoolapi.dev/Ej9KTG/data",
//         method: "GET",
//         cache: "no-store", // Avoid caching
//
// credentials:"include",     };
//     return await apiHandler(request);
// }
export async function sendQuery(query: string) {
    const request: ApiRequest = {
        endpoint: `${process.env.NEXT_SERVER_IP}api/v1/search/?query=${query}`, // Adjust to filter data by name
        method: "GET", // Use GET to filter data directly
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
