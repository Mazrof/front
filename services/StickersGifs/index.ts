import apiHandler from "@/lib/apiHandler";
import { StickerGif } from "@/types/inputMessage";
import { ApiRequest } from "@/types/request";
// const server = `${process.env.NEXT_SERVER_IP}api/v1`;
export async function getStickers(): Promise<StickerGif[]> {
    const request: ApiRequest = {
        endpoint: `http://localhost:4000/stickers`,
        method: "GET",
        cache: "no-store", // to avoid caching
        // credentials: "include",
    };
    return await apiHandler(request);
}
export async function getGifs(): Promise<StickerGif[]> {
    const request: ApiRequest = {
        endpoint: `http://localhost:4000/gifs`,
        method: "GET",
        cache: "no-store", // to avoid caching
        // credentials: "include",
    };
    return await apiHandler(request);
}
