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
        return NextResponse.rewrite("/error");
    }
    const token: UserToken = await LoginWithOauth(code, provider);
    if (token.error) return NextResponse.rewrite("/error");
    else return NextResponse.redirect("/");
}
