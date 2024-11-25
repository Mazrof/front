import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { GroupData } from "@/types/group";
import { ApiRequest } from "@/types/request";
const server = "http://localhost:3000/api/v1";
export async function createGroup(body: GroupData): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/groups`,
        method: "POST",
        cache: "no-store",
        body,
    };
    return await apiHandler(request);
}
