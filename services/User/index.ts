import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";
import { UserToken } from "@/types/user";
const server = "http://localhost:4000";

export async function LoginWithEmail(email: string, password: string): Promise<UserToken> {
    const request: ApiRequest = {
        endpoint: `${server}/users`,
        method: "POST",
        cache: "no-store",
        body: { email: email, password: password },
        headers: {
            "Content-Type": "application/json",
        },
    };
    const user = await apiHandler(request);
    return user?.email + user?.password;
}
export async function LoginWithAouth(code: string, aouthType: string): Promise<UserToken> {
    const request: ApiRequest = {
        endpoint: `${server}/${aouthType}`,
        method: "POST",
        cache: "no-store", // to avoid caching
        body: { code },
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await apiHandler(request);
}
