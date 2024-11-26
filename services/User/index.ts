import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ApiRequest } from "@/types/request";
import { BlockUser, UserToken } from "@/types/user";
const server = "http://localhost:3000/api/v1/auth";

export async function LoginWithEmail(
    email: string,
    password: string
): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/login`,
        method: "POST",
        cache: "no-store",
        body: { email, password },
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await apiHandler(request);
    return response;
}
export async function LoginWithOauth(
    code: string,
    oathType: string
): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/social-login`,
        method: "POST",
        cache: "no-store", // to avoid caching
        body: { provider: oathType, access_token: code },
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await apiHandler(request);
    return response;
}

export async function getBlockedUsers(): Promise<BlockUser[]> {
    const request: ApiRequest = {
        endpoint: `${server}/blockedUsers`,
        method: "GET",
        cache: "no-store", // to avoid caching
    };
    return await apiHandler(request);
}
export async function logout(): Promise<BlockUser[]> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/logout`,
        method: "POST",
        cache: "no-store", // to avoid caching
    };
    return await apiHandler(request);
}
export async function unBlockUser(userId:string): Promise<{message?:string}> {

    const request: ApiRequest = {
        endpoint: `${server}/users/${userId}/block`,
        method: "DELETE",
        cache: "no-store",
    };
    return await apiHandler(request);
}
