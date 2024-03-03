import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

export default async function AdminOnlyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center grid h-[80vh] place-content-center">
      <span className="text-2xl font-bold">Admin Only Authentication</span>
      {session && (
        <div className="text-base break-words max-w-[90vw]">
          <h6>{JSON.stringify(session, null, 2)}</h6>
        </div>
      )}
    </div>
  );
}
