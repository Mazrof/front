import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ApiRequest } from "@/types/request";
import { LoginResponse } from "@/types/settings";
import { BlockListResponse, user, WhoAmI } from "@/types/user";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;

export async function Recaptcha(token: string): Promise<genericResponse<WhoAmI>> {
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

export async function SendEmailCode(email: string): Promise<genericResponse<WhoAmI>> {
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
export async function SendPhoneCode(phone: string): Promise<genericResponse<WhoAmI>> {
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
): Promise<genericResponse<string>> {
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
): Promise<genericResponse<{ user: LoginResponse }>> {
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
    password: string,
    publicKey: string,
    privateKey: string
): Promise<genericResponse<string>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/signup`,
        method: "POST",
        cache: "no-store",
        body: { email, password, phone, username, publicKey, privateKey },

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
export async function getWhoAmI(): Promise<genericResponse<WhoAmI>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/whoami`,
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
export async function resetPassword(email: string): Promise<genericResponse<{ message: string }>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/request-password-reset`,
        method: "POST",
        cache: "no-store",
        body: { email }, // to avoid caching
        credentials: "include",
    };
    return await apiHandler(request);
}
export async function changePassword(body: {
    userId: number;
    token: string;
    newPassword: string;
}): Promise<genericResponse<{ message: string }>> {
    const request: ApiRequest = {
        endpoint: `${server}/auth/reset-password`,
        method: "POST",
        cache: "no-store",
        body,
        credentials: "include",
    };
    return await apiHandler(request);
}
