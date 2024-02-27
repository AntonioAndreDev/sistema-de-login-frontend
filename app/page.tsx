import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { ToggleTheme } from "@/components/toggle-theme";

export default async function Home() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    return (
        <div className="text-center text-6xl">
            <span>Home</span>
            <ToggleTheme />
            {session && <div className="text-base">{JSON.stringify(session, null, 2)}</div>}
        </div>
    );
}
