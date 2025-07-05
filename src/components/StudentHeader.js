import React from 'react';
import './StudentHeader.css';

function StudentHeader({ onLogout }) {
  return (
    <header className="student-header">
      <div className="student-header-left">
        <span className="logo" aria-label="Beeedu Logo">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#6699FF" />
            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" dy=".3em">B</text>
          </svg>
        </span>
        <div className="header-social">
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#fff" opacity="0.15"/><circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="1.5"/><circle cx="15.2" cy="4.8" r="1" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#fff" opacity="0.15"/><rect x="5" y="8" width="2" height="7" fill="#fff"/><rect x="9" y="11" width="2" height="4" fill="#fff"/><circle cx="6" cy="6" r="1" fill="#fff"/></svg>
          </a>
        </div>
      </div>
      <nav className="student-header-menu">
        <a href="#" className="active">HOME</a>
        <a href="#">CURSOS</a>
        <a href="#">FEED</a>
      </nav>
      <div className="student-header-right">
        <button className="notif-btn" aria-label="Notificações">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#fff" strokeWidth="1.5"/></svg>
        </button>
        <div className="profile-photo" title="Perfil">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="12" r="6" fill="#fff"/><rect x="6" y="22" width="20" height="8" rx="4" fill="#fff"/></svg>
        </div>
        <div className="level-badge">Lv. 3 <span className="badge" title="Badge">🏅</span></div>
        <div className="profile-dropdown">
          <button className="dropdown-btn">▼</button>
          <div className="dropdown-content">
            <div className="dropdown-section">Contas
              <div className="dropdown-link">Estudante</div>
              <div className="dropdown-link">Professor</div>
              <div className="dropdown-link">Empresa</div>
            </div>
            <div className="dropdown-section">Perfil
              <div className="dropdown-link">Editar Foto</div>
              <div className="dropdown-link">Dados Pessoais</div>
              <div className="dropdown-link">2FA</div>
              <div className="dropdown-link">E-mail</div>
              <div className="dropdown-link">Telefone</div>
              <div className="dropdown-link">Pagamento</div>
              <div className="dropdown-link">Endereço</div>
              <div className="dropdown-link">Escola</div>
            </div>
            <div className="dropdown-section">Outros
              <div className="dropdown-link">Amigos</div>
              <div className="dropdown-link">Cursos</div>
              <div className="dropdown-link">Freelas</div>
              <div className="dropdown-link">Empresas</div>
              <div className="dropdown-link">Draft</div>
              <div className="dropdown-link">Wallet (HCT)</div>
            </div>
            <div className="dropdown-link logout" onClick={onLogout}>Sair</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default StudentHeader; 