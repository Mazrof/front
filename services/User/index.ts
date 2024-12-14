import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ApiRequest } from "@/types/request";
import { BlockListResponse, UserToken } from "@/types/user";
const server = `http://localhost:3000/api/v1`;

export async function Recaptcha(token: string): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/verify-recaptcha`,
        method: "POST",
        cache: "no-store",
        body: { token },
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}

export async function GetUsers(): Promise<genericResponse<UserToken>> {
    try {
        const request: ApiRequest = {
            endpoint: `${server}/admins/users`,
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
        return await apiHandler(request);
    } catch (error) {
        console.error("Error in GetUsers:", error);
        throw new Error("Failed to fetch users");
    }
}
export async function GetGroups(): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/groups`,
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
export async function BanandUnban(id: string): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/admins/${id}`,
        method: "PATCH",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
export async function FilterandRemovefilter(id: string): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/admins/${id}`,
        method: "POST",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}

export async function SendEmailCode(email: string): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/send-code`,
        method: "POST",
        cache: "no-store",
        body: { email },
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
export async function SendPhoneCode(phone: string): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/send-code-sms`,
        method: "POST",
        cache: "no-store",
        body: { phone },
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
export async function VerifyEmailCode(
    email: string,
    code: string
): Promise<genericResponse<UserToken>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/verify-code`,
        method: "POST",
        cache: "no-store",
        body: { email, code },
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };
    const response = await apiHandler(request);
    return response;
}
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
export async function SignupWithEmail(
    name: string,
    username: string,
    phone: string,
    email: string,
    password: string
) {
    const request: ApiRequest = {
        endpoint: `${server}/auth/signup`,
        method: "POST",
        cache: "no-store",
        body: { email, password, phone, username },
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
