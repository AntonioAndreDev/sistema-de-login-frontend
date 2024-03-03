"use client";

import { Menu, ShieldAlert, ShieldCheck, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChangeDomain } from "./change-domain";
import { useSession } from "next-auth/react";
import { ToggleTheme } from "./toggle-theme";

export default function NavBarMobile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex lg:hidden px-4 justify-between items-center py-4">
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
        {!isOpen && <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer h-7 w-7" />}
        {isOpen && <XIcon onClick={() => setIsOpen(!isOpen)} className="cursor-pointer h-7 w-7" />}
      </div>
      {isOpen && session && (
        <aside className="flex justify-center mt-4 lg:hidden px-4">
          <nav className="flex gap-4 flex-wrap justify-center">
            <Button onClick={() => setIsOpen(false)} className="text-base" asChild>
              <Link href={"/"}>Auth - Server</Link>
            </Button>
            <Button className="text-base" asChild>
              <Link onClick={() => setIsOpen(false)} href={"auth-client"}>
                Auth - Client
              </Link>
            </Button>
            <Button className="text-base" asChild>
              <Link onClick={() => setIsOpen(false)} href={"/admin-only"}>
                Admin - Only
              </Link>
            </Button>
            <ChangeDomain />
            <div className="flex gap-4">
              {!session ? (
                <Button variant={"default"} className="font-semibold text-base px-6" asChild>
                  <Link onClick={() => setIsOpen(false)} href={`/login`}>
                    Entrar
                  </Link>
                </Button>
              ) : (
                <Button variant={"destructive"} className="font-semibold text-base px-6" asChild>
                  <Link onClick={() => setIsOpen(false)} href={`/signout`}>
                    Sair
                  </Link>
                </Button>
              )}
              <ToggleTheme />
            </div>
          </nav>
        </aside>
      )}
      {isOpen && !session && (
        <div className="flex justify-center">
          <Button variant={"default"} className="font-semibold text-base px-12" asChild>
            <Link href={`/login`}>Entrar</Link>
          </Button>
        </div>
      )}
    </>
  );
}
