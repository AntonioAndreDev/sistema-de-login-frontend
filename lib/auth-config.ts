import { NextAuthOptions } from "next-auth";

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
        domain: { label: "Domain", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_URL}/login`, {
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

          let authorizedUser = {
            id: user.userExists.id,
            name: user.userExists.name,
            password: user.userExists.password,
            email: user.userExists.email,
            domain: user.userExists.domain,
            token: user.token,
          };

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
      if (user) {
        console.log("user", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.domain = user.domain;
        token.token = user.token;
        if (user.domain === "ADMINAAD") {
          token.role = "admin";
        } else {
          token.role = "user";
        }
      }
      return token;
    },
    session({ token, session }) {
      session.user.token = token.token;
      session.user.domain = token.domain;
      session.user.role = token.role;
      session.user.token = token.token;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
};
