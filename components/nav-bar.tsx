import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <header>
            <nav>oi</nav>
        </header>
    );
};

export default NavBar;
