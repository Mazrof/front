import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ChannelData } from "@/types/channel";
import { ApiRequest } from "@/types/request";
import { ChannelMember, MemberRole } from "@/types/user";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;
type CreateChannelRequest = {
    name: string;
    privacy: boolean;
    canAddComments: boolean;
    admins: string[];
};
export async function createChannel(
    body: CreateChannelRequest
): Promise<genericResponse<{ channel: ChannelData }>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function getChannelMembers(
    channelId: number
): Promise<genericResponse<{ members: ChannelMember[] }>> {
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
    body: MemberRole,
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
