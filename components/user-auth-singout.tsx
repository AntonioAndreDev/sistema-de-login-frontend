"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserAuthSignout() {
    return (
        <Button
            variant={"destructive"}
            className="px-6 py-2 w-full text-xl flex items-center justify-center font-semibold"
            onClick={() => {
                signOut({ callbackUrl: "/" });
            }}
        >
            Sair
        </Button>
    );
}
