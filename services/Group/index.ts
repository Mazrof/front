import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { Member, MemberRole } from "@/types/user";
import { GroupData } from "@/types/group";
import { ApiRequest } from "@/types/request";
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
): Promise<genericResponse<{ members: Member[] }>> {
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
export async function addMembersToGroup(
    body: MemberRole,
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
