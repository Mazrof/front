"use server";

import { cookies } from "next/headers";

export async function setCookies(data: object) {
    const cookieStore = await cookies();
    Object.entries(data).forEach(([key, value]) => cookieStore.set(key, value));
}
export async function deleteCookies(keys: string[]) {
    const cookieStore = await cookies();
    keys.map((key) => cookieStore.delete(key));
}
export async function checkCookies(keys: string[]) {
    const cookieStore = await cookies();
    const keysExist = keys.every((key) => cookieStore.has(key) === true);
    return keysExist;
}
export async function getCookies(keys: string[]): Promise<{ [key: string]: string | null }> {
    const cookieStore = await cookies();
    const result: { [key: string]: string | null } = {};

    keys.forEach((key) => {
        const cookie = cookieStore.get(key);
        result[key] = cookie ? cookie.value : null; 
    });

    return result;
}