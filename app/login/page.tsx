import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

import UserAuthLogin from "@/components/user-auth-login";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        return redirect("/");
    }
    return (
        <>
            <UserAuthLogin />
        </>
    );
}
