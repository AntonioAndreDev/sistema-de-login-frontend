"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export default function AuthClient() {
  const { data: session } = useSession();
  return (
    <div className="text-center grid h-[80vh] place-content-center">
      <span className="text-2xl font-bold">Client Authentication</span>
      {!session && <Skeleton className="h-5 rounded-none w-full" />}
      {session && (
        <div className="text-base break-words max-w-[90vw]">
          <h6>{JSON.stringify(session, null, 2)}</h6>
        </div>
      )}
    </div>
  );
}
