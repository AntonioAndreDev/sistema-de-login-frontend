"use client";
import { signOut } from "next-auth/react";

export default function UserAuthSignout() {
    return (
        <button
            className="bg-red-600 px-6 py-2 w-full text-xl flex items-center justify-center font-semibold"
            onClick={() => {
                signOut({ callbackUrl: "/" });
            }}
        >
            Sair
        </button>
    );
}
