import nextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            token?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            image?: string | undefined;
            token?: string | undefined;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string | undefined;
    }
}
