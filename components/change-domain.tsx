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
import { useSession } from "next-auth/react";

export function ChangeDomain() {
    const { data } = useSession();

    const role = JSON.stringify(data?.user.role, null, 2);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-lg" variant="default">
                    Alterar Domínio
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Alterar Domínio</DialogTitle>
                    <DialogDescription>
                        Se você deseja ter as opções de administrador insira como domínio{" "}
                        <span className="underline">ADMINAAD</span>
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
                        <Input id="dominioNovo" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
