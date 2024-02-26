"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
    email: string;
    password: string;
    domain: string;
}

export default function UserAuthLogin({ className, ...props }: UserAuthFormProps) {
    const [formData, setFormData] = useState<IUser>({
        email: "",
        password: "",
        domain: "",
    });

    const searchParams = useSearchParams();
    const search = searchParams.get("error");

    const [isDisabled, setIsDisabled] = useState(false);

    function handleFormChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => {
            return { ...prev, [ev.target.name]: ev.target.value };
        });
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsDisabled(true);
        const res = await signIn<"credentials">("credentials", {
            ...formData,
            redirect: true,
            callbackUrl: "/",
        });
        setIsDisabled(false);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label htmlFor="email" className="sr-only">
                            Email
                        </Label>
                        <Input
                            disabled={isDisabled}
                            id="email"
                            name="email"
                            placeholder="email@gmail.com"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="username" className="sr-only">
                            Password
                        </Label>
                        <Input
                            disabled={isDisabled}
                            id="password"
                            name="password"
                            placeholder="paSsw0rd!"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            value={formData.password}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        {search === "CredentialsSignin" && (
                            <p className="text-red-500 text-sm">Credenciais inválidas, tente novamente.</p>
                        )}
                    </div>
                    <Button disabled={isDisabled}>
                        {isDisabled && <Loader2 className="animate-spin" />}
                        {!isDisabled && "Entrar"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
