"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export default function AuthClientPage() {
    const { data: session } = useSession();
    return (
        <div className="text-center text-6xl">
            <span>Client Authentication</span>
            {!session && <Skeleton className="h-5 rounded-none w-full" />}
            {session && <div className="text-base">{JSON.stringify(session, null, 2)}</div>}
        </div>
    );
}
