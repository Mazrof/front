import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";
import { SettingResponse, SettingsObject, UpdatedSettingResponse } from "@/types/settings";
import { PrivacyOptionsEnum } from "@/types/settings";
import { WhoAmI } from "@/types/user";
import {  genericResponse } from "@/types/api";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;
export async function getUserId(): Promise<genericResponse<WhoAmI>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/whoami`,
        method: "GET",
        cache: "no-store", // to avoid caching
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
export async function getProfile(data:WhoAmI): Promise<genericResponse<SettingResponse>> {
        const request: ApiRequest = {
            endpoint: `${server}/profile/${data.user.id}`,
            method: "GET",
            cache: "no-store", // to avoid caching
            credentials: "include",
        };
        const response = await apiHandler(request);
        return response;
}
export async function updateProfile(
    updates: Record<string, number | string | boolean | PrivacyOptionsEnum>,data:WhoAmI
): Promise<genericResponse<UpdatedSettingResponse>> {
    const request: ApiRequest = {
        endpoint: `${server}/profile/${data.user.id}`,
        method: "PATCH",
        cache: "no-store",
        body: updates, // Send the updates object directly
        credentials: "include",
    }
        return await apiHandler(request);
}

export async function getAllUsers(): Promise<genericResponse<{ users: SettingsObject[] }>> {
    const request: ApiRequest = {
        endpoint: `${server}/profile`,
        method: "GET",
        cache: "no-store",
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
