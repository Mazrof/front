import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { GroupData } from "@/types/group";
import { ApiRequest } from "@/types/request";
import { GroupMember } from "@/types/user";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;
export async function createGroup(body: GroupData): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/groups`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}

export async function getGroupMembers(
    groupId: number
): Promise<genericResponse<{ members: GroupMember[] }>> {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/members`,
        method: "GET",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}

export async function updateGroupSettings(
    groupId: number,
    body: object
): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/`,
        method: "PATCH",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function addAdminsToGroup(body: object, groupId: number) {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/members`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function addMemberToGroup(
    body: {
        memberId: number;
        role: "admin" | "member";
        hasMessagePermissions: boolean;
        hasDownloadPermissions: boolean;
    },
    groupId: number
): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/members`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}

export async function muteNotification(groupId: number, body: object) {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/mute`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}

export async function deleteGroup(groupId: number) {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}`,
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function deleteMember(groupId: number, memberId: number) {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/members/${memberId}`,
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function editMember(
    body: { role: string; hasDownloadPermissions: boolean },
    groupId: number,
    memberId: number
) {
    const request: ApiRequest = {
        endpoint: `${server}/groups/${groupId}/members/${memberId}`,
        method: "PATCH",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
