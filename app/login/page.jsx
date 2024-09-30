import React from 'react';
import '../css/loginStyles.css'; //Importa estilos css
import Image from 'next/image'; //Importa Image do Next.js

const Login = () => {
  return (
    <div className="login-container">
      {/*Borda azul superior*/}
      <div className="top-bar">
        <div className="logo-container">
          <Image
            src="/images/logo.png"
            alt="Univates Logo"
            width={180}
            height={80}
          />
        </div>
      </div>

      {/*Conteúdo principa*/}
      <div className="content-container">
        {/*Imagem de fundo (esquerdo)*/}
        <div className="left-side"></div>

        {/*Formulário (direito)*/}
        <div className="right-side">
          <h2 className="login-title" style={{ fontFamily: 'Bebas Neue, cursive' }}>
            ACESSAR SISTEMA
          </h2>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="codigo" style={{ fontFamily: 'Merriweather, serif' }}>Código</label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha" style={{ fontFamily: 'Merriweather, serif' }}>Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                className="input-field"
              />
            </div>
            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
