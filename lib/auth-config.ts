import { NextAuthOptions, User } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const auth: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "Giuliana" },
                password: { label: "Password", type: "password" },
                // domain: { label: "Domain", type: "text", placeholder: "ADMINAAD", value: "ADMINAAD" },
            },
            async authorize(credentials, req) {
                try {
                    // console.log("credentials", credentials);

                    const response = await fetch("http://localhost:3333/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                    });

                    if (!response.ok) {
                        throw new Error("Erro ao fazer login");
                    }

                    const user = await response.json();
                    console.log(user);

                    let authorizedUser = {
                        id: user.userExists.id,
                        name: user.userExists.name,
                        password: user.userExists.password,
                        email: user.userExists.email,
                    };

                    console.log("authorizedUser", authorizedUser);

                    return authorizedUser;
                } catch (error) {
                    console.error("Erro ao fazer login:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            console.log("token", token);

            return token;
        },
        session({ token, session }) {
            // console.log("session(params) - start call");
            // console.log("token", token);
            // console.log("session", session);
            // console.log("session(params) - end call");

            session.user.token = token.token;

            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/signout",
    },
};
