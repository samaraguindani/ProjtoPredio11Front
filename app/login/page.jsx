"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import "../css/tailwind.css";

const Login = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/bem/cadastro");
  };

  const handleNumericInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
  };

  return (
    <div className="flex h-screen flex-col">
      {/*Barra azul*/}
      <div className="bg-[#0431B2] h-16 flex items-center pl-5">
        <div className="flex justify-start">
          <Image src="/images/logo.png" alt="Univates Logo" width={180} height={80} />
        </div>
      </div>

      {/*Conteúdo principal*/}
      <div className="flex flex-1">
        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/fundo.jpg')" }}></div>

        {/*Formulário (lado direito)*/}
        <div className="flex flex-1 flex-col justify-center items-center p-5">
          <h2 className="text-5xl mb-8 text-gray-900 w-full max-w-md text-left" style={{ fontFamily: "Bebas Neue, cursive" }}>
            ACESSAR SISTEMA
          </h2>
          <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="codigo" className="block text-lg text-gray-800 mb-1" style={{ fontFamily: "Merriweather, serif" }}>Código</label>
              <Input
                type="text"
                id="codigo"
                name="codigo"
                className="input-custom w-11/12 p-3 border border-pink-500 rounded-md"
                onInput={handleNumericInput}
              />
            </div>
            <div>
              <label htmlFor="senha" className="block text-lg text-gray-800 mb-1" style={{ fontFamily: "Merriweather, serif" }}>Senha</label>
              <Input
                type="password"
                id="senha"
                name="senha"
                className="input-custom w-11/12 p-3 border border-pink-500 rounded-md"
              />
            </div>
            <Button type="submit" className="w-1/3 h-12 bg-[#0431B2] text-white hover:bg-[#FF28B9]">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
