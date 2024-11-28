import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";
import { SettingResponse, UpdatedSettingResponse } from "@/types/settings";
import { PrivacyOptionsEnum } from "@/types/settings";
import { WhoAmI } from "@/types/user";
import { getCookies } from "@/lib/cookiesActions";
import { failResponse, genericResponse, successResponse } from "@/types/api";
const server = "http://localhost:3000/api/v1";
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
export async function getProfile(): Promise<genericResponse<SettingResponse>> {
    const idResponse: genericResponse<WhoAmI> = await getUserId();
    if (idResponse.status === "success") {
        const data: WhoAmI = (idResponse as successResponse<WhoAmI>).data;
        const request: ApiRequest = {
            endpoint: `${server}/profile/${data.user.id}`,
            method: "GET",
            cache: "no-store", // to avoid caching
            credentials: "include",
        };
        const response = await apiHandler(request);
        return response;
    } else return idResponse as failResponse;
}
export async function updateProfile(
    updates: Record<string, number | string | boolean | PrivacyOptionsEnum>
): Promise<genericResponse<UpdatedSettingResponse>> {
    const idResponse: genericResponse<WhoAmI> = await getUserId();
    if (idResponse.status === "success") {
        const data: WhoAmI = (idResponse as successResponse<WhoAmI>).data;
        const request: ApiRequest = {
            endpoint: `${server}/profile/${data.user.id}`,
            method: "PATCH",
            cache: "no-store",
            body: updates, // Send the updates object directly
            credentials: "include",
        };

        return await apiHandler(request);
    } else return idResponse as failResponse;
}
