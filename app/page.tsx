"use client"; // Marcando o componente como cliente para usar useEffect

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter do 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redireciona para /login
  }, [router]);

  return null; // Não renderiza nada na página inicial
}
