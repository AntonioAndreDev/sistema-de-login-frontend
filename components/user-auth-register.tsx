"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
    name: string;
    password: string;
    email: string;
    domain: string;
}

export default function UserAuthRegister({ className, ...props }: UserAuthFormProps) {
    const [formData, setFormData] = useState<IUser>({
        name: "",
        password: "",
        email: "",
        domain: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    function handleFormChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => {
            return { ...prev, [ev.target.name]: ev.target.value };
        });
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const res = await fetch("api/users", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.log(errorData.error);

            if (errorData.error === "Email já cadastrado") {
                setIsLoading(false);
                toast({
                    title: "Email já cadastrado!",
                    variant: "destructive",
                    description: "Entre na sua conta ou faça um novo cadastro.",
                });
                return;
            }

            if (errorData.error === "Preencha todos os campos") {
                setIsLoading(false);
                toast({
                    title: "Preencha todos os campos!",
                    variant: "destructive",
                    description: "Preencha todos os campos para continuar.",
                });
                return;
            }
        }

        setFormData({
            name: "",
            password: "",
            email: "",
            domain: "",
        });

        setIsLoading(false);
        toast({
            title: "Conta criada com sucesso!",
            variant: "default",
            description: "Agora você pode fazer login.",
        });

        router.push("/login");
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
                            data-testid="email"
                            id="email"
                            name="email"
                            placeholder="giuliana@gmail.com"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="name" className="sr-only">
                            User Name
                        </Label>
                        <Input
                            disabled={isLoading}
                            id="name"
                            name="name"
                            placeholder="Giuliana Rodrigues"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            value={formData.name}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password" className="sr-only">
                            Password
                        </Label>
                        <Input
                            disabled={isLoading}
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
                        <Label htmlFor="domain" className="sr-only">
                            Domain
                        </Label>
                        <Input
                            disabled={isLoading}
                            id="domain"
                            name="domain"
                            placeholder="domain"
                            type="domain"
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            value={formData.domain}
                            onChange={handleFormChange}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {" "}
                        {isLoading && <Loader2 className="animate-spin" />}
                        {!isLoading && "Criar conta"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
