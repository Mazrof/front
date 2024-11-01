import { NextResponse } from "next/server";
import { LoginWithAouth } from "@/services/User";
import { UserToken } from "@/types/user";
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            aouth: string;
        };
    }
) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const provider = params.aouth;
    //TO DO modify when backend
    if (!code) {
        return NextResponse.json({ error: "Authorization code not found" }, { status: 400 });
    }
    const token: UserToken = await LoginWithAouth(code, provider);

    //TO DO Call backend Here
    if (token)
        return NextResponse.redirect("http://localhost:3000/"); // Redirect to the custom error page
    else return NextResponse.redirect("http://localhost:3000/error");
}
