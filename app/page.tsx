import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);

    // if (!session) {
    //     return redirect("/login");
    // }

    return (
        <div className="text-center text-6xl">
            <span>Server Authentication</span>
            {session && <div className="text-base">{JSON.stringify(session, null, 2)}</div>}
        </div>
    );
}
