import NavBar from "@/components/nav-bar";
import "./globals.css";
import AuthProvider from "@/components/providers/auth-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="dark">
                <AuthProvider>
                    <Toaster />
                    <NextTopLoader />
                    <NavBar />
                    <main className="grid h-screen place-content-center">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
