import { Metadata } from "next";
import UserAuthRegister from "@/components/user-auth-register";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
    return (
        <>
            <UserAuthRegister />
        </>
    );
}
