import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <header className="flex justify-between items-center px-24 py-2 sticky top-0 z-50 border-b bg-background/95 backdrop-blur ">
            {session ? (
                <ShieldCheck className={`${session && "text-emerald-500"}`} size={"32"} />
            ) : (
                <ShieldAlert className={`${!session && "text-red-500"}`} size={"32"} />
            )}
            <div className="flex gap-4 items-baseline">
                {!session ? (
                    <Button variant={"default"} size={"lg"} className="font-semibold text-xl" asChild>
                        <Link href={`/login`}>Entrar</Link>
                    </Button>
                ) : (
                    <Button variant={"destructive"} size={"lg"} className="font-semibold text-xl" asChild>
                        <Link href={`/signout`}>Sair</Link>
                    </Button>
                )}

                <ToggleTheme />
            </div>
        </header>
    );
};

export default NavBar;
