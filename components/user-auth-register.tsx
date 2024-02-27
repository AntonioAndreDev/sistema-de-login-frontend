"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
    name: string;
    password: string;
    email: string;
}

export default function UserAuthRegister({ className, ...props }: UserAuthFormProps) {
    const [formData, setFormData] = useState<IUser>({
        name: "",
        password: "",
        email: "",
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

        // Validate form data
        if (!formData.email || !formData.name || !formData.password) {
            setIsLoading(false);
            toast({
                title: "Preencha todos os campos!",
                variant: "destructive",
                description: "Preencha todos os campos para continuar.",
            });
            return;
        }

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
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Criar Conta</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Criar Conta</CardTitle>
                                <CardDescription>
                                    Se você ainda não possui uma conta, crie uma preenchendo as informações abaixo.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        data-testid="name"
                                        id="name"
                                        name="name"
                                        placeholder="Antônio André"
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="none"
                                        autoCorrect="off"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        data-testid="email"
                                        id="email"
                                        name="email"
                                        placeholder="exemplo@gmail.com"
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="none"
                                        autoCorrect="off"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        data-testid="password"
                                        id="password"
                                        name="password"
                                        placeholder="p4ssw0rd!"
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="none"
                                        autoCorrect="off"
                                        value={formData.password}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button disabled={isLoading}>
                                    {" "}
                                    {isLoading && <Loader2 className="animate-spin" />}
                                    {!isLoading && "Criar conta"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    );
}
