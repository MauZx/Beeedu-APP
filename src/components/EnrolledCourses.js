import React from 'react';
import './StudentDashboard.css';

export default function EnrolledCourses() {
  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <span style={{ color: '#6699FF', fontWeight: 700, fontSize: 32 }}>🐝BEEEDU</span>
          </div>
        </div>
        <nav className="header-menu">
          <a href="/" >INÍCIO</a>
          <a href="/matriculados" className="active">CURSOS MATRICULADOS</a>
          <a href="#">FEED</a>
        </nav>
      </header>
      <main className="dashboard-main" style={{ background: '#f7f9fb', minHeight: '80vh', padding: '32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24, color: '#223' }}>Cursos Matriculados</h2>
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontWeight: 600, fontSize: 22, marginBottom: 16, color: '#223' }}>Tecnologia & Design</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', width: 370, minHeight: 420, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <img src="https://img.youtube.com/vi/ugPM7j9AmFQ/maxresdefault.jpg" alt="UX Design" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#6699FF', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Tecnologia & Design</span>
                  <h4 style={{ fontWeight: 700, fontSize: 20, margin: '8px 0 12px' }}>UX Design</h4>
                  <span style={{ color: '#43b324', fontWeight: 500, fontSize: 14, marginBottom: 8 }}>Gratuito</span>
                  <span style={{ color: '#888', fontSize: 15, marginBottom: 12 }}>Curso completo de UX Design com vídeos selecionados.</span>
                  <a href="https://www.youtube.com/watch?v=ugPM7j9AmFQ&list=PLwgL9IEA0PxXwYSLBFSEuxZigG07_iet-" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', background: '#6699FF', color: '#fff', padding: '10px 0', borderRadius: 8, textAlign: 'center', fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Acessar Curso</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="dashboard-footer">
        <div className="footer-col">
          <h4>Sobre</h4>
          <a href="#">Quem Somos</a>
          <a href="#">Missão</a>
          <a href="#">Contato</a>
        </div>
        <div className="footer-col">
          <h4>Comunidade</h4>
          <a href="#">Escolas</a>
          <a href="#">Faculdades</a>
          <a href="#">Empresas</a>
          <a href="#">Blog</a>
          <a href="#">Podcast</a>
        </div>
        <div className="footer-col">
          <h4>Mais</h4>
          <a href="#">Imprensa</a>
          <a href="#">Investidores</a>
          <a href="#">Termos</a>
          <a href="#">Ajuda</a>
          <a href="#">Acessibilidade</a>
          <a href="#">Cookies</a>
        </div>
      </footer>
    </div>
  );
} 