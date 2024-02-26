import UserAuthSignout from "@/components/user-auth-singout";

export default function SignOut() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Realmente deseja sair da sua conta?</h1>
            <UserAuthSignout />
        </div>
    );
}
