import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ChangeDomain } from "./change-domain";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import NavBarMobile from "@/components/nav-bar-mobile";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header className="lg:flex hidden gap-2 justify-between items-center px-4 xl:px-24 py-2 sticky top-0 z-50 border-b border-b-gray-500/50 bg-background/95 backdrop-blur ">
        {session ? (
          <div className="flex gap-4 items-center">
            <ShieldCheck className={`${session && "text-emerald-500"}`} size={"32"} />
            <h1 className="text-2xl">
              Olá, <span className="capitalize">{session.user.name}</span>!
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <ShieldAlert className={`${!session && "text-red-500"}`} size={"32"} />
          </div>
        )}
        {session && (
          <nav className="text-base lg:flex hidden gap-2 justify-center">
            <Button className="text-lg" asChild>
              <Link href={"/"}>Auth - Server</Link>
            </Button>
            <Button className="text-lg" asChild>
              <Link href={"auth-client"}>Auth - Client</Link>
            </Button>
            <Button className="text-lg" asChild>
              <Link href={"/admin-only"}>Admin - Only</Link>
            </Button>
            <ChangeDomain />
          </nav>
        )}
        <div className="lg:flex hidden gap-4 items-baseline">
          {!session ? (
            <Button variant={"default"} className="font-semibold text-lg px-12" asChild>
              <Link href={`/login`}>Entrar</Link>
            </Button>
          ) : (
            <Button variant={"destructive"} className="font-semibold text-lg px-12" asChild>
              <Link href={`/signout`}>Sair</Link>
            </Button>
          )}
          <ToggleTheme />
        </div>
      </header>
      <NavBarMobile />
    </>
  );
};

export default NavBar;
