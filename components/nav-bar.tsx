"use client";
import { useSession } from "next-auth/react";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ChangeDomain } from "./change-domain";

const NavBar = () => {
    const { data: session } = useSession();

    return (
        <header className="flex justify-between items-center px-24 py-2 sticky top-0 z-50 border-b bg-background/95 backdrop-blur ">
            {session ? (
                <div className="flex gap-4 items-center">
                    <ShieldCheck className={`${session && "text-emerald-500"}`} size={"32"} />
                    <h1 className="text-2xl">
                        Olá, <span className="capitalize">{session.user.name}</span>!
                    </h1>
                </div>
            ) : (
                <ShieldAlert className={`${!session && "text-red-500"}`} size={"32"} />
            )}
            {session && (
                <nav className="text-base flex gap-12">
                    <Button className="text-lg" asChild>
                        <Link href={"/"}>Auth - Server</Link>
                    </Button>
                    <Button className="text-lg" asChild>
                        <Link href={"auth-client"}>Auth - Client</Link>
                    </Button>
                    <ChangeDomain />
                </nav>
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
