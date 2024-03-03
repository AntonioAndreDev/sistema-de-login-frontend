import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Sistema de Autenticação e Autorização",
  description: "Um sistema de autenticação e autorização com NextAuth.js e Next.js, feito por Antônio André",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center grid h-[80vh] place-content-center w-full">
      <span className="text-2xl font-bold">Server Authentication</span>
      {session && (
        <div className="text-base break-words max-w-[90vw]">
          <h6>{JSON.stringify(session, null, 2)}</h6>
        </div>
      )}
    </div>
  );
}
