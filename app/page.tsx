"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); //Redireciona para /login
  }, [router]);

  return null; //Não renderiza nada na página inicial
}
