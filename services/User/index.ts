import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ApiRequest } from "@/types/request";
import { BlockListResponse, UserToken } from "@/types/user";
const server = "http://localhost:3000/api/v1";

export async function LoginWithEmail(
    email: string,
    password: string
): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/login`,
        method: "POST",
        cache: "no-store",
        body: { email, password },
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
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
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}

export async function getBlockedUsers(): Promise<genericResponse<BlockListResponse>> {
    const request: ApiRequest = {
        endpoint: `${server}/user/block?blockerID=1`,
        method: "GET",
        cache: "no-store", // to avoid caching
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function logout(): Promise<genericResponse<null>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/logout`,
        method: "POST",
        cache: "no-store", // to avoid caching
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function unBlockUser(userId: string): Promise<genericResponse<null>> {
    const request: ApiRequest = {
        endpoint: `${server}/user/${userId}/block?blockerID=1`,
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
    };
    return await apiHandler(request);
}
