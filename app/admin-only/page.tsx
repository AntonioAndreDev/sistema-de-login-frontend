import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

export default async function AdminOnlyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center text-6xl  grid h-[80vh] place-content-center">
      <span>Admin Only Authentication</span>
      {session && <div className="text-base">{JSON.stringify(session, null, 2)}</div>}
    </div>
  );
}
