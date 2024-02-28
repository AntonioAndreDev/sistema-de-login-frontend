import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname === "/login") {
            console.log("Redirecting to login page");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (!req.nextauth.token) {
            console.log("Redirecting to register page");
            return NextResponse.redirect(new URL("/register", req.url));
        }
    },
    {
        callbacks: {
            authorized({ token }) {
                return !!token;
            },
        },
    }
);
export const config = { matcher: ["/", "/auth-client", "/signout"] };
