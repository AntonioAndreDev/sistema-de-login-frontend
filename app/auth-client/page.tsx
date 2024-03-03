import AuthClient from "./authClient";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Client - Sistema de Autenticação e Autorização",
    description: "Um sistema de autenticação e autorização com NextAuth.js e Next.js, feito por Antônio André",
  };
}

export default function AuthClientPage() {
  return (
    <div className="text-center grid h-[80vh] place-content-center">
      <AuthClient />
    </div>
  );
}
