import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set([
    "/login",
    "/signup",
    "/verification",
    "/forget-password",
    "/reset-password",
]);

function isRouteMatched(pathname: string, routes: Set<string>): boolean {
    for (const route of routes) {
        if (pathname.startsWith(route)) {
            return true;
        }
    }
    return false;
}

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("connect.sid")?.value;
    if (!accessToken) {
        if (isRouteMatched(request.nextUrl.pathname, PUBLIC_ROUTES)) {
            return NextResponse.next();
        }

        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    const user_type = request.cookies.get("user_type")?.value;
    const disallowedRoutes = new Set(PUBLIC_ROUTES);
    if (user_type === "user") {
        disallowedRoutes.add("/admin-dashboard");
    }

    if (isRouteMatched(request.nextUrl.pathname, disallowedRoutes)) {
        return NextResponse.redirect(
            new URL(user_type === "user" ? "/" : "/admin-dashboard", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
