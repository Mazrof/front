import { NextResponse } from "next/server";
import { LoginWithOauth } from "@/services/User";
import { UserToken } from "@/types/user";
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            oauth: string;
        };
    }
) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const provider = params.oauth;
    //TO DO modify when backend
    if (!code) {
        return NextResponse.redirect(new URL("/OAuthError", req.url));
    }
    const token: UserToken = await LoginWithOauth(code, provider);
    if (token.error) return NextResponse.redirect(new URL("/OAuthError", req.url));
    else return NextResponse.redirect(new URL("/", req.url));
}
