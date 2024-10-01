'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../../css/cadastroStyles.css';

export default function CadastroBem() {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [itens, setItens] = useState(1);
  const [status, setStatus] = useState('Retirado');
  const [bens, setBens] = useState([
    { id: 1, Código: '', Descrição: '', Itens: '', Status: '' },
    { id: 2, Código: '', Descrição: '', Itens: '', Status: '' },
    { id: 3, Código: '', Descrição: '', Itens: '', Status: '' },
  ]);

  const handleNovo = () => {
    const novoBem = {
      id: bens.length + 1,
      codigo: `COD00${bens.length + 1}`,
      descricao,
      itens,
      status,
    };
    setBens([...bens, novoBem]);
  };

  const [showCadastro, setShowCadastro] = useState(false);
  const [showProcessosBem, setShowProcessosBem] = useState(false);

  return (
    <div className="cadastro-container">
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
          <div className="form-row-group">
            <div className="form-row">
              <label>Código</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="bordered-input"
              />
            </div>
            <div className="form-row">
              <label>Itens</label>
              <select value={itens} onChange={(e) => setItens(e.target.value)} className="bordered-input select-input">
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>{n + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row-group">
            <div className="form-row">
              <label>Descrição</label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="bordered-input"
              />
            </div>
            <div className="form-row">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="bordered-input select-input">
                <option value="Retirado">Retirado</option>
                <option value="Devolvido">Devolvido</option>
              </select>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-buscar">Buscar</button>
          <button className="btn btn-novo">Novo</button>
          <button className="btn btn-export">Exportar csv</button>
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
            {bens.map((bem) => (
              <tr key={bem.id}>
                <td>
                  <button className="btn-edit">
                    <img src="/images/edit.png" alt="Edit" />
                  </button>
                  <button className="btn-delete">
                    <img src="/images/remove.png" alt="Remove" />
                  </button>
                </td>
                <td>{bem.codigo}</td>
                <td>{bem.itens}</td>
                <td>{bem.descricao}</td>
                <td>{bem.status}</td>
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
