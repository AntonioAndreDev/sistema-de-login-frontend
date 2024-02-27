import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <header className="flex justify-between items-center px-24 py-2 sticky top-0 z-50 border-b bg-background/95 backdrop-blur ">
            {session ? "" : <h1 className="text-2xl">Para continuar faça login</h1>}
            <div className="flex gap-4 items-baseline">
                <Button variant={"default"} size={"lg"} className="font-semibold text-xl">
                    Fazer login
                </Button>
                <Button variant={"secondary"} size={"default"} className="font-medium text-xl">
                    Criar conta
                </Button>
                <ToggleTheme />
            </div>
        </header>
    );
};

export default NavBar;
