import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        //...
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
