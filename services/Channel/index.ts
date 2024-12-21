import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ChannelData } from "@/types/channel";
import { ApiRequest } from "@/types/request";
import { ChannelMember } from "@/types/user";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;
type CreateChannelRequest = {
    name?: string;
    privacy?: boolean;
    canAddComments?: boolean;
    admins?: string[];
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
    body: {
        name: string;
        privacy: boolean;
        imageURL: string;
        canAddComments: boolean;
    }
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
export async function addMembersToChannel(
    body: {
        userId: number;
        hasDownloadPermissions: boolean;
    },
    channelId: number
) {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/members`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function joinChannel(body: { token: string }): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels/invitation`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}

export async function editMember(
    body: { role: string; hasDownloadPermissions: boolean },
    channelId: number,
    memberId: number
) {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/members/${memberId}`,
        method: "PATCH",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}

export async function deleteMember(channelId: number, memberId: number) {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}/members/${memberId}`,
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function deleteChannel(channelId: number) {
    const request: ApiRequest = {
        endpoint: `${server}/channels/${channelId}`,
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
