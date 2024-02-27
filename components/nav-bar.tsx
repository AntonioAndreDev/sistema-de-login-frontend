import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import { ToggleTheme } from "@/components/toggle-theme";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <header>
            <ToggleTheme />
        </header>
    );
};

export default NavBar;
