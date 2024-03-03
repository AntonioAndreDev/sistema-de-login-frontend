import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { redirect } from "next/navigation";

export default async function UnauthorizedPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "admin") {
    return redirect("/admin-only");
  }

  return (
    <div className="text-center text-6xl grid h-[80vh] place-content-center">
      <span className="text-2xl font-bold">Você não está autorizado!</span>
      <p className="text-base">
        Para ter acesso à essa rota altere seu domínio para <span className="italic underline">ADMINAAD</span>
      </p>
    </div>
  );
}
