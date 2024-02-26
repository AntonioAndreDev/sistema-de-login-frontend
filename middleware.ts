import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        console.log("middleware(req) - start call");

        if (req.nextUrl.pathname === "/admin-only" && req.nextauth.token?.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        console.log("middleware(req) - end call");
    },
    {
        callbacks: {
            authorized({ token }) {
                console.log("callback - authorized({ token }) - start call");
                console.log("callback - authorized({ token }) - end call");

                return !!token;
            },
        },
    }
);

// Esse config fala: "Eu só que que o que está no middleware seja executado
// quando for nessa rota X"
export const config = { matcher: ["/admin-only"] };
