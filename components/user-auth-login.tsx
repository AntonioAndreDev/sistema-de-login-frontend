"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  email: string;
  password: string;
}

export default function UserAuthLogin({ className, ...props }: UserAuthFormProps) {
  const [formData, setFormData] = useState<IUser>({
    email: "",
    password: "",
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
    <div className="mt-12">
      <form onSubmit={onSubmit}>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <Button variant={"secondary"} asChild>
                  <Link href={"/register"}>Criar uma conta</Link>
                </Button>
              </CardHeader>
              <Separator />
              <CardHeader>
                <CardTitle>Entrar na Conta</CardTitle>
                <CardDescription>Entre na sua conta agora mesmo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
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
                    type="password"
                    autoCapitalize="none"
                    autoComplete="none"
                    autoCorrect="off"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>
                {search === "CredentialsSignin" && (
                  <p className="text-red-500 text-sm italic">Credenciais inválidas, por favor tente novamente.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full text-center" disabled={isDisabled}>
                  {isDisabled && <Loader2 className="animate-spin" />}
                  {!isDisabled && "Entrar"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
