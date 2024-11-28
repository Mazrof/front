import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ChannelData, JoinRequest } from "@/types/channel";
import { ApiRequest } from "@/types/request";
const server = `${process.env.SERVER_IP}/api/v1`;
export async function createChannel(body: ChannelData): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function getChannelMembers(channelId: number): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/members`,
        method: "GET",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
//TODO: Add Name >>> For Body
export async function updateChannelSettings(
    channelId: number,
    body: object
): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/`,
        method: "PATCH",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function addAdminsToChannel(body: object, channelId: number) {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/members`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function addMembersToChannel(
    body: JoinRequest,
    channelId: number
): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/members`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
