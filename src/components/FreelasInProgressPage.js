import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './StudentDashboard.css';

// Dados simulados de freelas em andamento
const FREELAS_DATA = [
  {
    id: 1,
    titulo: 'Landing Page para Startup',
    empresa: 'StartBee',
    status: 'em_andamento',
    progresso: 70,
    dataInicio: '2024-01-12',
    dataPrevista: '2024-02-10',
    descricao: 'Criação de landing page responsiva para captação de leads.',
    tecnologias: ['React', 'Styled-Components', 'Figma'],
    remuneracao: 'R$ 1.200',
    horasEstimadas: 40,
    horasRealizadas: 28,
    prioridade: 'alta',
    mentor: 'Lucas Andrade',
    feedback: 'Layout excelente, continue assim!'
  },
  {
    id: 2,
    titulo: 'API para Marketplace',
    empresa: 'BeeMarket',
    status: 'em_andamento',
    progresso: 45,
    dataInicio: '2024-01-20',
    dataPrevista: '2024-03-01',
    descricao: 'Desenvolvimento de API RESTful para marketplace de serviços.',
    tecnologias: ['Node.js', 'Express', 'MongoDB'],
    remuneracao: 'R$ 2.000',
    horasEstimadas: 60,
    horasRealizadas: 27,
    prioridade: 'média',
    mentor: 'Patrícia Lima',
    feedback: 'Ótima organização do código.'
  }
];

function getStatusColor(status) {
  switch (status) {
    case 'em_andamento': return '#6699FF';
    case 'pausado': return '#9E9E9E';
    case 'concluido': return '#4CAF50';
    default: return '#2196F3';
  }
}

function getStatusText(status) {
  switch (status) {
    case 'em_andamento': return 'Em Andamento';
    case 'pausado': return 'Pausado';
    case 'concluido': return 'Concluído';
    default: return 'Não Definido';
  }
}

function getPriorityColor(prioridade) {
  switch (prioridade) {
    case 'alta': return '#F44336';
    case 'média': return '#FF9800';
    case 'baixa': return '#4CAF50';
    default: return '#9E9E9E';
  }
}

export default function FreelasInProgressPage() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFreelas = FREELAS_DATA.filter(freela => {
    const matchesStatus = filterStatus === 'todos' || freela.status === filterStatus;
    const matchesSearch = freela.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freela.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: FREELAS_DATA.length,
    emAndamento: FREELAS_DATA.filter(f => f.status === 'em_andamento').length,
    totalRemuneracao: FREELAS_DATA.reduce((sum, f) => sum + parseInt(f.remuneracao.replace('R$ ', '').replace('.', '')), 0)
  };

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3266.66 593.2" width="160" aria-label="Beeedu Logo">
              <g id="Layer_x0020_1">
                <g id="_2768876670848">
                  <g transform="matrix(1 0 0 1 -1216.41 283.597)">
                    <text x="1633.33" y="296.6" fill="#6699FF" fontWeight="500" fontSize="664.41" fontFamily="sans-serif">BEEEDU</text>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <nav className="header-menu">
          <Link to="/">INÍCIO</Link>
          <Link to="/matriculados">CURSOS MATRICULADOS</Link>
          <Link to="#">CURSOS</Link>
          <Link to="#">FEED</Link>
        </nav>
        <div className="header-right">
          <div className="beeedu-coin">
            <img src="/beeedu-coin.svg" alt="Beeedu Coin" width={32} height={32} style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: 32, maxHeight: 32 }} />
            <span style={{ marginLeft: 8, fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>HCT 0.00</span>
          </div>
          <button className="notif-btn" aria-label="Notificações">🔔</button>
          <img src={user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'Aluno')} alt="Perfil" className="profile-pic" />
          <Link to="/progresso" className="level-badge" style={{ textDecoration: 'none' }}>
            <span className="level">Lv. 12</span>
            <span className="badge">🏅</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main" style={{ background: 'var(--cinza-claro)', minHeight: '80vh', padding: '32px 0', color: 'var(--deep-blue)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Header da página */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--azul-beeedu)', marginBottom: 8 }}>
              💼 Freelas em Andamento
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 24 }}>
              Acompanhe seus trabalhos freelance ativos, progresso e feedback dos mentores
            </p>
          </div>

          {/* Estatísticas */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--azul-beeedu)', borderRadius: 12, padding: 20, flex: 1, minWidth: 150, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{stats.total}</div>
              <div style={{ fontSize: 14, color: '#fff', opacity: 0.9 }}>Total</div>
            </div>
            <div style={{ background: 'var(--azul-beeedu)', borderRadius: 12, padding: 20, flex: 1, minWidth: 150, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{stats.emAndamento}</div>
              <div style={{ fontSize: 14, color: '#fff', opacity: 0.9 }}>Em Andamento</div>
            </div>
            <div style={{ background: 'var(--azul-beeedu)', borderRadius: 12, padding: 20, flex: 1, minWidth: 150, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>R$ {stats.totalRemuneracao.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: '#fff', opacity: 0.9 }}>Total Remuneração</div>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <input
                type="text"
                placeholder="Buscar por freela ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--cinza-card)',
                  fontSize: 14,
                  background: '#fff'
                }}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--cinza-card)',
                fontSize: 14,
                background: '#fff',
                minWidth: 150
              }}
            >
              <option value="todos">Todos os status</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="pausado">Pausado</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          {/* Lista de Freelas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {filteredFreelas.map((freela) => (
              <div key={freela.id} style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 24, 
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--cinza-card)'
              }}>
                {/* Header do freela */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--deep-blue)', margin: 0 }}>
                        {freela.titulo}
                      </h3>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#fff',
                        background: getStatusColor(freela.status)
                      }}>
                        {getStatusText(freela.status)}
                      </span>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#fff',
                        background: getPriorityColor(freela.prioridade)
                      }}>
                        {freela.prioridade.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--azul-beeedu)', marginBottom: 4 }}>
                      {freela.empresa}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      💼 Freela • 💰 {freela.remuneracao} • ⏱️ {freela.horasEstimadas}h estimadas
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {freela.descricao}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: 16 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--azul-beeedu)' }}>
                      {freela.progresso}%
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      Progresso
                    </div>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ 
                    height: 8, 
                    background: 'var(--cinza-claro)', 
                    borderRadius: 4, 
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${freela.progresso}%`, 
                      background: 'linear-gradient(90deg, var(--azul-beeedu) 0%, var(--azul-beeedu-light) 100%)',
                      borderRadius: 4,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>

                {/* Tecnologias */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--deep-blue)', marginBottom: 8 }}>
                    🛠️ Tecnologias:
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {freela.tecnologias.map((tech, index) => (
                      <span key={index} style={{
                        padding: '4px 12px',
                        borderRadius: 16,
                        fontSize: 12,
                        background: 'var(--azul-beeedu-light)',
                        color: 'var(--azul-beeedu)',
                        fontWeight: 500
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Informações detalhadas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>📅 Data Início</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{new Date(freela.dataInicio).toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>🎯 Data Prevista</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{new Date(freela.dataPrevista).toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>⏱️ Horas Realizadas</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{freela.horasRealizadas}/{freela.horasEstimadas}h</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>👨‍🏫 Mentor</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{freela.mentor}</div>
                  </div>
                </div>

                {/* Feedback do mentor */}
                <div style={{ 
                  background: 'var(--cinza-claro)', 
                  borderRadius: 8, 
                  padding: 16, 
                  marginBottom: 16,
                  borderLeft: '4px solid var(--azul-beeedu)'
                }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    💬 Feedback do Mentor:
                  </div>
                  <div style={{ fontSize: 14, fontStyle: 'italic' }}>
                    "{freela.feedback}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 