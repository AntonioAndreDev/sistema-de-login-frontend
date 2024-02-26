import nextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role?: string | undefined;
            domain?: string | undefined;
            token?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            image?: string | undefined;
            token?: string | undefined;
        };
    }
    interface User {
        role?: string | undefined;
        domain?: string | undefined;
        token?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        image?: string | undefined;
        token?: string | undefined;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string | undefined;
        domain: string | undefined;
        token: string | undefined;
    }
}
