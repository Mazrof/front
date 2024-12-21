import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ApiRequest } from "@/types/request";
import { Group, user } from "@/types/user";
const server = `${process.env.NEXT_SERVER_IP}api/v1`;
export async function GetUsers(): Promise<genericResponse<{ users: user[] }>> {
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
export async function GetGroups(): Promise<genericResponse<{ groups: Group[] }>> {
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
export async function BanandUnban(id: string): Promise<genericResponse<{ message: string }>> {
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
export async function FilterandRemovefilter(
    id: string
): Promise<genericResponse<{ message: string }>> {
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
