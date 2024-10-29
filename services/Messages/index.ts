import apiHandler from "@/lib/apiHandler";
import { MessageType } from "@/types/Message";
import { ApiRequest } from "@/types/request";
const server = "http://localhost:4000";



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

export async function getMessages(): Promise<MessageType[]> {
    const request: ApiRequest = {
        endpoint: `${server}/messages`,
        method: 'GET',
        cache: 'no-store', // to avoid caching
    }
    return await apiHandler(request);
}