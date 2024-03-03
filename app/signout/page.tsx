import UserAuthSignout from "@/components/user-auth-singout";
import { auth as authOptions } from "@/lib/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sair - Sistema de Autenticação e Autorização",
  description: "Um sistema de autenticação e autorização com NextAuth.js e Next.js, feito por Antônio André",
};

export default async function SignOut() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex-col gap-2 px-4 grid h-[80vh] place-content-center">
      <h1 className="text-2xl text-center font-bold">Realmente deseja sair da sua conta?</h1>
      <UserAuthSignout />
    </div>
  );
}
