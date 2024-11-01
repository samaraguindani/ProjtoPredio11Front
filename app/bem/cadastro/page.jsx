"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "../../../components/ui/table";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../components/ui/collapsible";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "../../../components/ui/dialog";
import { ChevronDown } from "lucide-react";
import "../../css/tailwind.css";

export default function CadastroBem() {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [itens, setItens] = useState(1);
  const [status, setStatus] = useState("");
  const [bens, setBens] = useState([]);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isProcessosBemOpen, setIsProcessosBemOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBem, setCurrentBem] = useState(null);

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [bemToRemove, setBemToRemove] = useState(null);

  const [dialogEditPosition] = useState({ top: "71%", left: "50%" });
  const [dialogRemovePosition] = useState({ top: "61%", left: "50%" });

  const handleNovo = () => {
    const novoBem = {
      id: bens.length + 1,
      codigo,
      descricao,
      itens,
      status,
    };
    setBens([...bens, novoBem]);
    setCodigo("");
    setDescricao("");
    setItens(1);
    setStatus("Retirado");
  };

  const handleRemoveBem = (id) => {
    setBens(bens.filter(bem => bem.id !== id));
    setIsRemoveDialogOpen(false);
    setBemToRemove(null);
  };

  const handleEditClick = (bem) => {
    setCurrentBem(bem);
    setIsDialogOpen(true);
  };

  const handleRemoveClick = (bem) => {
    setBemToRemove(bem);
    setIsRemoveDialogOpen(true);
  };

  const handleSaveChanges = () => {
    setBens(bens.map(bem => (bem.id === currentBem.id ? currentBem : bem)));
    setIsDialogOpen(false);
    setCurrentBem(null);
  };

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-[#FF6947] text-white fixed flex flex-col p-4">
        <div className="flex items-center mb-6">
          <div className="rounded-full">
            <Image src="/images/user.png" alt="User" width={40} height={40} />
          </div>
          <p className="ml-2 font-bold">Nome do Usuário</p>
        </div>

        <Collapsible open={isCadastroOpen} onOpenChange={setIsCadastroOpen}>
          <CollapsibleTrigger className="flex items-center justify-between font-semibold cursor-pointer mb-2 hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Cadastro
            <ChevronDown className={`ml-2 transform ${isCadastroOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-4">
            <Link href="/bem/cadastro" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Bem</Link>
            <Link href="/bem/kits" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Kit</Link>
            <Link href="/bem/tipo" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Tipo de Bem</Link>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isProcessosBemOpen} onOpenChange={setIsProcessosBemOpen}>
          <CollapsibleTrigger className="flex items-center justify-between font-semibold cursor-pointer mt-4 mb-2 hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Processos Bem
            <ChevronDown className={`ml-2 transform ${isProcessosBemOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-4">
            <Link href="/bem/retiradas" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Retirada</Link>
            <Link href="/bem/devolucao" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Devolução</Link>
            <Link href="/bem/baixar" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Baixar Bem</Link>
            <Link href="/bem/repor" className="block hover:bg-white hover:text-[#FF6947] p-2 rounded">Repor Bem</Link>
          </CollapsibleContent>
        </Collapsible>

        <div className="space-y-4 mt-4">
          <Link href="/bem/reserva" className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Reserva
          </Link>
          <Link href="/bem/multa" className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Multa
          </Link>
          <Link href="/bem/minha-reserva" className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Minha Reserva/Retirada
          </Link>
          <Link href="/bem/relatorio" className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Relatório
          </Link>
        </div>

        <div className="mt-auto flex items-center">
          <Image src="/images/logout.png" alt="Logout" width={23} height={23} />
          <button className="ml-2 text-white font-semibold hover:bg-white hover:text-[#FF6947] p-2 rounded" onClick={() => router.push('../login')}>LogOut</button>
        </div>
      </aside>

      <main className="ml-64 p-8 w-full overflow-y-auto">
        <div className="bg-white p-4 rounded shadow">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Código</label>
                <Input
                  type="number"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder=""
                  className="w-full h-12"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Itens</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={itens}
                    onChange={(e) => setItens(Number(e.target.value))}
                    className="w-full h-12"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Descrição</label>
                <Input
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder=""
                  className="w-full h-12"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full h-12">
                    <span>{status}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponivel">Disponível</SelectItem>
                    <SelectItem value="Indisponivel">Indisponível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <Button variant="outline" className="bg-[#0431B2] text-white h-12 w-32 hover:bg-[#021a61]">
              Buscar
            </Button>
            <Button variant="outline" className="bg-[#439B23] text-white h-12 w-32 hover:bg-[#326d18]" onClick={handleNovo}>
              Novo
            </Button>
            <Button variant="outline" className="bg-[#FF6947] text-white h-12 w-30 hover:bg-[#d05537]">
              Exportar CSV
            </Button>
          </div>
        </div>

        <Table className="mt-8">
          {bens.length > 0 && (
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="px-20 py-1">Código</TableHead>
                <TableHead className="px-20 py-1">Descrição</TableHead>
                <TableHead className="px-20 py-1">Itens</TableHead>
                <TableHead className="px-20 py-1">Status</TableHead>
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {bens.map((bem) => (
              <TableRow key={bem.id}>
                <TableCell className="px-10 py-1">
                  <Button
                    className="mr-2 hover:bg-gray-200"
                    onClick={(e) => handleEditClick(bem, e)}
                  >
                    <Image src="/images/edit.png" alt="Edit" width={25} height={25} />
                  </Button>
                  <Button className="hover:bg-gray-200" onClick={() => handleRemoveClick(bem)}>
                    <Image src="/images/remove.png" alt="Remove" width={25} height={25} />
                  </Button>
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="px-20 py-1">{bem.codigo}</TableCell>
                <TableCell className="px-20 py-1">{bem.descricao}</TableCell>
                <TableCell className="px-20 py-1">{bem.itens}</TableCell>
                <TableCell className="px-20 py-1">{bem.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            style={{
              top: dialogEditPosition.top,
              left: dialogEditPosition.left,
              transform: "translate(-50%, -50%)",
              position: "fixed",
            }}
            className="max-w-md p-4 border-2 border-[#FF6947] bg-white z-50"
          >
            <DialogHeader>
              <DialogTitle className="mb-5">Editar Bem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Código</label>
                  <Input
                    type="number"
                    value={currentBem?.codigo || ""}
                    onChange={(e) => setCurrentBem({ ...currentBem, codigo: e.target.value })}
                    className="w-full h-12"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Itens</label>
                  <Input
                    type="number"
                    value={currentBem?.itens || 1}
                    onChange={(e) => setCurrentBem({ ...currentBem, itens: Number(e.target.value) })}
                    className="w-full h-12"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Descrição</label>
                  <Input
                    value={currentBem?.descricao || ""}
                    onChange={(e) => setCurrentBem({ ...currentBem, descricao: e.target.value })}
                    className="w-full h-12"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Status</label>
                  <Select
                    value={currentBem?.status || ""}
                    onValueChange={(value) => setCurrentBem({ ...currentBem, status: value })}
                  >
                    <SelectTrigger className="w-full h-12">
                      <span>{currentBem?.status || "Selecione um status"}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponivel">Disponível</SelectItem>
                      <SelectItem value="Indisponivel">Indisponível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4 flex justify-between">
              <Button variant="outline" className="bg-[#0431B2] text-white h-12 w-32 hover:bg-[#021a61]" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="outline" className="bg-[#439B23] text-white h-12 w-32 hover:bg-[#326d18]" onClick={handleSaveChanges}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
          <DialogContent
            className="max-w-md p-4 border-2 border-[#FF6947] bg-white fixed left-1/2 transform -translate-x-1/2"
            style={{ top: dialogRemovePosition.top, transform: "translate(-50%, -50%)", position: "fixed" }}
          >
            <DialogHeader>
              <DialogTitle className="mb-5">Remover Bem</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Tem certeza de que deseja remover este bem?
            </DialogDescription>
            <DialogFooter className="mt-4 flex justify-between">
              <Button variant="outline" className="bg-[#0431B2] text-white h-12 w-32 hover:bg-[#021a61]" onClick={() => setIsRemoveDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="outline" className="bg-[#FF6947] text-white h-12 w-32 hover:bg-[#d05537]" onClick={() => handleRemoveBem(bemToRemove.id)}>
                Remover
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
