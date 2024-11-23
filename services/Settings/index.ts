import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";
import { SettingsObject } from "@/types/settings";
import { PrivacyOptionsEnum } from "@/types/settings";
const server = "http://localhost:3000/api/v1";
export async function getProfile(): Promise<SettingsObject> {
    const request: ApiRequest = {
        endpoint: `${server}/profile`,
        method: "GET",
        cache: "no-store", // to avoid caching
    };
    return await apiHandler(request);
}
export async function updateProfile(
    attribute: string,
    value: number | string | boolean | PrivacyOptionsEnum
): Promise<SettingsObject> {
    const request: ApiRequest = {
        endpoint: `${server}/profile`,
        method: "PATCH",
        cache: "no-store",
        body: { [attribute]: value },
    };
    return await apiHandler(request);
}
