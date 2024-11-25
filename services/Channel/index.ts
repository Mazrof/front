import apiHandler from "@/lib/apiHandler";
import { genericResponse } from "@/types/api";
import { ChannelData } from "@/types/channel";
import { ApiRequest } from "@/types/request";
const server = "http://localhost:3000/api/v1";
export async function createChannel(body: ChannelData): Promise<genericResponse<object>> {
    const request: ApiRequest = {
        endpoint: `${server}/channels`,
        method: "POST",
        cache: "no-store",
        body,
    };
    return await apiHandler(request);
}
