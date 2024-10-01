'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../../css/tipoStyles.css';

export default function KitsPage() {
  const [descricao, setDescricao] = useState('');
  const [kits, setKits] = useState([
    { id: 1, codigo: '', itens: '', descricao: '', status: '' },
    { id: 2, codigo: '', itens: '', descricao: '', status: '' },
    { id: 3, codigo: '', itens: '', descricao: '', status: '' },
  ]);

  const [showCadastro, setShowCadastro] = useState(false);
  const [showProcessosBem, setShowProcessosBem] = useState(false);

  return (
    <div className="kits-container">
      {/* Barra superior */}
      <div className="top-bar">
        <div className="logo-container">
          <Image src="/images/logo.png" alt="Univates Logo" width={180} height={80} />
        </div>
      </div>

        {/* Menu lateral */}
        <aside className="sidebar">
        <div className="user-info">
          <img src="/images/user.png" alt="User" className="user-photo" />
          <p>Nome do Usuário</p>
        </div>
        <nav className="menu">
          <div>
            <h4 onClick={() => setShowCadastro(!showCadastro)}>Cadastro</h4>
            {showCadastro && (
              <ul>
                <li><a href="/bem/cadastro">Bem</a></li>
                <li><a href="/bem/kits">Kit</a></li>
                <li><a href="/bem/tipo">Tipo de Bem</a></li>
              </ul>
            )}
          </div>
          <div>
            <h4 onClick={() => setShowProcessosBem(!showProcessosBem)}>Processos Bem</h4>
            {showProcessosBem && (
              <ul>
                <li><button style={{ cursor: 'pointer' }}>Retirada</button></li>
                <li><button style={{ cursor: 'pointer' }}>Devolução</button></li>
                <li><button style={{ cursor: 'pointer' }}>Baixar Bem</button></li>
                <li><button style={{ cursor: 'pointer' }}>Repor Bem</button></li>
              </ul>
            )}
          </div>
          <div>
            <button>Reserva</button>
          </div>
          <div>
            <button>Multa</button>
          </div>
          <div>
            <button>Minha Reserva/Retirada</button>
          </div>
          <div>
            <button>Relatório</button>
          </div>
        </nav>

        {/* Área de Logout */}
        <div className="logout">
          <button className="logout-button">
            <img src="/images/logout.png" alt="Logout Icon" className="logout-icon" />
            <span>LogOut</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        <div className="form-container">
          <div className="form-row">
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="bordered-input"
            />
          </div>
          <div className="button-group">
            <button className="btn btn-buscar">Buscar</button>
            <button className="btn btn-novo">Novo</button>
          </div>
        </div>

        {/* Tabela */}
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Código</th>
              <th>Itens</th>
              <th>Descrição</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {kits.map((kit) => (
              <tr key={kit.id}>
                <td>
                  <button className="btn-edit">
                    <img src="/images/edit.png" alt="Edit" />
                  </button>
                  <button className="btn-delete">
                    <img src="/images/remove.png" alt="Remove" />
                  </button>
                </td>
                <td>{kit.codigo}</td>
                <td>{kit.itens}</td>
                <td>{kit.descricao}</td>
                <td>{kit.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="pagination">
          <button className="pagination-button">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button">4</button>
          <button className="pagination-button">5</button>
        </div>
      </main>
    </div>
  );
}
