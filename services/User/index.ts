import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";
import { UserToken } from "@/types/user";
const server = "http://localhost:3000/api/v1/auth";
export type LoginResponse = {
    status: string;
    data: UserToken;
};
export async function LoginWithEmail(email: string, password: string): Promise<UserToken> {
    const request: ApiRequest = {
        endpoint: `${server}/login`,
        method: "POST",
        cache: "no-store",
        body: { email, password },
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response: LoginResponse = await apiHandler(request);
    return response.data;
}
export async function LoginWithOauth(code: string, oathType: string): Promise<UserToken> {
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
    return {
        access_token: response.provider,
        refresh_token: response.access_token,
    };
}
