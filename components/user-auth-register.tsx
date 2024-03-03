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
import { Separator } from "./ui/separator";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  name: string;
  password: string;
  email: string;
  domain: string;
  confirmPassword: string;
}

export default function UserAuthRegister({ className, ...props }: UserAuthFormProps) {
  const [formData, setFormData] = useState<IUser>({
    name: "",
    password: "",
    confirmPassword: "",
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

    // Validate form data
    if (!formData.email || !formData.name || !formData.password || !formData.confirmPassword) {
      setIsLoading(false);
      toast({
        title: "Preencha todos os campos!",
        variant: "destructive",
        description: "Preencha todos os campos para continuar.",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      toast({
        title: "Senhas não coincidem!",
        variant: "destructive",
        description: "As senhas não coincidem, tente novamente.",
      });
      return;
    }

    // const res = await fetch("api/users", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // });

    const res = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_URL}/users`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        domain: formData.domain,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData.error);

      if (errorData.error === "Usuário já possui email cadastrado!") {
        setIsLoading(false);
        toast({
          title: "Email já cadastrado!",
          variant: "destructive",
          description: "Entre na sua conta ou faça um novo cadastro.",
        });
        return;
      }

      if (errorData.error === "É necessário preencher todos os campos!") {
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
      confirmPassword: "",
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
    <div className="mt-12">
      <form onSubmit={onSubmit}>
        <Tabs defaultValue="register" className="w-[400px]">
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <Button variant={"secondary"} asChild>
                  <Link href={"/login"}>Já tenho uma conta</Link>
                </Button>
              </CardHeader>
              <Separator />
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>Se você ainda não possui uma conta, crie uma preenchendo as informações abaixo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    data-testid="name"
                    id="name"
                    name="name"
                    placeholder="Antonio Andre"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="none"
                    autoCorrect="off"
                    value={formData.name
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
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
                    type="email"
                    autoCapitalize="on"
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
                    type="password"
                    autoCapitalize="none"
                    autoComplete="none"
                    autoCorrect="off"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    data-testid="confirmPassword"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="p4ssw0rd!"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="none"
                    autoCorrect="off"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="domain">Domínio</Label>
                  <Input
                    data-testid="domain"
                    id="domain"
                    name="domain"
                    placeholder="usuario-padrao"
                    type="domain"
                    autoCapitalize="none"
                    autoComplete="none"
                    autoCorrect="off"
                    value={formData.domain}
                    onChange={handleFormChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={isLoading}>
                  {" "}
                  {isLoading && <Loader2 className="animate-spin" />}
                  {!isLoading && "Criar conta"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
