import { Metadata } from "next";

import UserAuthLogin from "@/components/user-auth-login";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
    return (
        <>
            <UserAuthLogin />
        </>
    );
}
