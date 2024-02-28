"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function ChangeDomain() {
    const [newDomain, setNewDomain] = useState("");

    const { data } = useSession();

    const role = JSON.stringify(data?.user.role, null, 2);
    const email = JSON.stringify(data?.user.email, null, 2).replace(/['"]/g, "");

    async function handleClick() {
        if (newDomain === "") {
            console.log("Campo vazio");
            return;
        }

        const res = await fetch("api/domain", {
            method: "POST",
            body: JSON.stringify({
                newDomain,
                email,
            }),
        });

        if (!res.ok) {
            console.log("Erro ao alterar domínio");
        }

        signOut({ callbackUrl: "/" });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-lg" variant="destructive">
                    Alterar Domínio
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Alterar Domínio</DialogTitle>
                    <DialogDescription>
                        Se você deseja ter as opções de administrador insira como domínio{" "}
                        <span className="underline">ADMINAAD.</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Atual
                        </Label>
                        <Input
                            disabled={true}
                            id="dominioAtual"
                            defaultValue={role.toUpperCase().replace(/['"]/g, "")}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dominioNovo" className="text-right">
                            Novo
                        </Label>
                        <Input
                            value={newDomain}
                            onChange={(ev) => setNewDomain(ev.target.value)}
                            id="dominioNovo"
                            className="col-span-3"
                        />
                    </div>
                    <div className="items-center gap-4">
                        <DialogDescription className="underline italic">
                            <strong>É necessário fazer login novamente após a alteração!</strong>
                        </DialogDescription>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleClick} type="submit">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
