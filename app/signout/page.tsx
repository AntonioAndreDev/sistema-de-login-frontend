import UserAuthSignout from "@/components/user-auth-singout";
import { auth as authOptions } from "@/lib/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignOut() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col gap-2  grid h-[80vh] place-content-center">
      <h1 className="text-3xl font-bold">Realmente deseja sair da sua conta?</h1>
      <UserAuthSignout />
    </div>
  );
}
