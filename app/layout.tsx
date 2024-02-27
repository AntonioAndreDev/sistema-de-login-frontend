import NavBar from "@/components/nav-bar";
import "./globals.css";
import AuthProvider from "@/components/providers/auth-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AuthProvider>
                        <Toaster />
                        <NextTopLoader />
                        <NavBar />
                        <main className="grid h-screen place-content-center">{children}</main>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
