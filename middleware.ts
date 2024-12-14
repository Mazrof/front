import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set(["/login", "/signup", "/forget-password", "/reset-password"]);
const DISALLOWED_ROUTES = new Set(["/login"]);

function isRouteMatched(pathname: string, routes: Set<string>): boolean {
    return Array.from(routes).some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("connect.sid")?.value;
    console.log(accessToken);
    if (!accessToken) {
        if (isRouteMatched(request.nextUrl.pathname, PUBLIC_ROUTES)) {
            return NextResponse.next();
        }

        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isRouteMatched(request.nextUrl.pathname, DISALLOWED_ROUTES)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
