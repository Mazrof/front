import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { MessageTypeBE } from "@/types/Message";
import { ApiRequest } from "@/types/request";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;
/**
 * Central API handler for interacting with the API and returning responses.
 *
 * @author Ahmed Mostafa Attia
 * @export
 * @async
 * @function getMessages
 *
 * @returns {Promise<unknown>} The data fetched from the server.
 *
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * @example
 * const requestShape = {
 *   endpoint: '/api/messages',
 *   method: 'GET',
 *   cache: 'force-cache',
 *   body: undefined, /** it's optional and better not to send undefined **
 * headers: { 'Authorization': 'Bearer token' },
 * revalidate: 10,
 * };
 */

export async function getMessages({
    id,
    page,
    limit,
}: {
    id: number;
    page: number;
    limit: number;
}): Promise<genericResponse<MessageTypeBE[]>> {
    const request: ApiRequest = {
        endpoint: `${server}/chats/${id}?page=${page}&limit=${limit}`,
        method: "GET",
        cache: "no-store", // to avoid caching
        credentials: "include",
    };
    return await apiHandler(request);
}
