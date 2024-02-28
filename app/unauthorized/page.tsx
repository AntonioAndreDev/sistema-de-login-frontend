import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { redirect } from "next/navigation";

export default async function UnauthorizedPage() {
    const session = await getServerSession(authOptions);

    if (session?.user.role === "admin") {
        return redirect("/admin-only");
    }

    return (
        <div className="text-center text-6xl text-green-700">
            <span>You are not authorized!</span>
        </div>
    );
}
