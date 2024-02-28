import { Metadata } from "next";
import UserAuthRegister from "@/components/user-auth-register";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
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
            <UserAuthRegister />
        </>
    );
}
