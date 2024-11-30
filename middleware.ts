import { NextRequest, NextResponse } from "next/server";
const publicRoutes = ["/login", "/signup", "/forget-password"];

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("connect.sid")?.value;

    const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
