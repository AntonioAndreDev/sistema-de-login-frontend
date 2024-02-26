import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

export default async function AdminOnlyPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="text-center text-6xl text-green-700">
            <span>Admin Only Authorization Access</span>
            {session && <div className="text-base">{JSON.stringify(session, null, 2)}</div>}
        </div>
    );
}
