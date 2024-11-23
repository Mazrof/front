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
