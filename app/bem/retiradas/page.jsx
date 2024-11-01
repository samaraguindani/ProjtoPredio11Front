"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Atualizado
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "../../../components/ui/dialog";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "../../../components/ui/table";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../../../components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function Retiradas() {
  const [selectedType, setSelectedType] = useState("item");
  const [codigo, setCodigo] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isProcessosTipoOpen, setIsProcessosTipoOpen] = useState(false);

  const items = [];

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
            <ChevronDown
              className={`ml-2 transform ${isCadastroOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-4">
            <Link
              href="/bem/cadastro"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Bem
            </Link>
            <Link
              href="/bem/kits"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Kit
            </Link>
            <Link
              href="/bem/tipo"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Tipo de Bem
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isProcessosTipoOpen}
          onOpenChange={setIsProcessosTipoOpen}
        >
          <CollapsibleTrigger className="flex items-center justify-between font-semibold cursor-pointer mt-4 mb-2 hover:bg-white hover:text-[#FF6947] p-2 rounded">
            Processos Bem
            <ChevronDown
              className={`ml-2 transform ${
                isProcessosTipoOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-4">
            <Link
              href="/bem/retiradas"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Retirada
            </Link>
            <Link
              href="/bem/devolucao"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Devolução
            </Link>
            <Link
              href="/bem/baixar"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Baixar Bem
            </Link>
            <Link
              href="/bem/repor"
              className="block hover:bg-white hover:text-[#FF6947] p-2 rounded"
            >
              Repor Bem
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <div className="space-y-4 mt-4">
          <Link
            href="/bem/reserva"
            className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded"
          >
            Reserva
          </Link>
          <Link
            href="/bem/multa"
            className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded"
          >
            Multa
          </Link>
          <Link
            href="/bem/minha-reserva"
            className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded"
          >
            Minha Reserva/Retirada
          </Link>
          <Link
            href="/bem/relatorio"
            className="font-semibold block hover:bg-white hover:text-[#FF6947] p-2 rounded"
          >
            Relatório
          </Link>
        </div>

        <div className="mt-auto flex items-center">
          <Image src="/images/logout.png" alt="Logout" width={23} height={23} />
          <button
            className="ml-2 text-white font-semibold hover:bg-white hover:text-[#FF6947] p-2 rounded"
            onClick={() => router.push("../login")}
          >
            LogOut
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8 w-full overflow-y-auto">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex space-x-2">
              <Button variant="outline" className={`rounded-full px-4 py-1 ${selectedType === "item" ? "bg-[#d9c2ff]" : ""}`} onClick={() => setSelectedType("item")}>Item</Button>
              <Button variant="outline" className={`rounded-full px-4 py-1 ${selectedType === "estudante" ? "bg-[#d9c2ff]" : ""}`} onClick={() => setSelectedType("estudante")}>Estudante</Button>
            </div>
            <Input placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-48" />
            <Button className="bg-[#0431B2] text-white h-12 w-32 hover:bg-[#021a61]">Buscar</Button>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
              <Button className="bg-[#439B23] text-white h-12 w-32 hover:bg-[#326d18] mt-5">Renovar</Button>
              <Button className="bg-[#ff69b4] text-white h-12 w-32 hover:bg-[#e657a1] mt-5">Devolver</Button>
        </div>

        <Table className="mt-8">
          <TableHeader>
            <TableRow>
            <TableHead className="px-4 py-2"><input type="checkbox" /></TableHead>
              <TableHead className="px-20 py-1">Código</TableHead>
              <TableHead className="px-20 py-1">Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><input type="checkbox" onChange={() => handleSelectItem(item.id)} /></TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}