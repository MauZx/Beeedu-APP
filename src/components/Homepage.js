import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Homepage.css';
import StudentLoginForm from './StudentLoginForm';
import StudentDashboard from './StudentDashboard';
import { useAuth } from '../AuthContext';

function Homepage({ onStudentRegister }) {
  const [showAccountType, setShowAccountType] = useState(false);
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [fading, setFading] = useState(false);
  const [error, setError] = useState('');
  const { user, login } = useAuth();

  const handleLogin = async (form) => {
    setError('');
    setFading(true);
    try {
      await login(form.identifier, form.password);
      setTimeout(() => {
        setShowStudentLogin(false);
        setFading(false);
      }, 400);
    } catch (err) {
      setFading(false);
      setError(err.message || 'Erro ao autenticar.');
    }
  };

  if (user) {
    return <div className="fade-transition fade-in"><StudentDashboard /></div>;
  }

  return (
    <div className={`homepage${fading ? ' fade-transition fade-out' : ''}`}>
      <Header />
      <main className="homepage-main">
        <div className="homepage-container">
          <div className="homepage-content">
            <div className="homepage-left">
              <div className="homepage-brand">
                <div className="homepage-logo">
                  <span className="logo-icon">🐝</span>
                  <h1 className="logo-text">Beeedu</h1>
                </div>
                <p className="homepage-tagline">
                  Conectando estudantes ao futuro do trabalho
                </p>
              </div>
              
              <div className="homepage-description">
                <h2>Transforme sua educação em oportunidades reais!</h2>
                <p>
                  Beeedu conecta estudantes de escolas públicas ao mercado de trabalho através de cursos, 
                  freelas, gamificação e Drafts de Vagas. Educação, experiência prática e empregabilidade 
                  em um só ecossistema vivo.
                </p>
              </div>

              <div className="homepage-features">
                <div className="feature-item">
                  <span className="feature-icon">🎓</span>
                  <span>Educação de qualidade</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💼</span>
                  <span>Experiência prática</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚀</span>
                  <span>Empregabilidade</span>
                </div>
              </div>
            </div>

            <div className="homepage-right">
              <div className="auth-card">
                <div className="auth-header">
                  <h3>Bem-vindo ao Beeedu</h3>
                  <p>Escolha como você quer começar</p>
                </div>

                <div className="auth-actions">
                  {!showAccountType ? (
                    <button 
                      className="auth-btn primary" 
                      onClick={() => setShowAccountType(true)}
                    >
                      <span className="btn-icon">✨</span>
                      Criar Conta
                    </button>
                  ) : (
                    <div className="account-type-options">
                      <button 
                        className="auth-btn primary" 
                        onClick={onStudentRegister}
                      >
                        <span className="btn-icon">👨‍🎓</span>
                        Cadastrar como Aluno
                      </button>
                      <button className="auth-btn secondary" disabled>
                        <span className="btn-icon">👨‍🏫</span>
                        Cadastro de Professor
                        <span className="coming-soon">(em breve)</span>
                      </button>
                      <button className="auth-btn secondary" disabled>
                        <span className="btn-icon">🏢</span>
                        Cadastro de Empresa
                        <span className="coming-soon">(em breve)</span>
                      </button>
                      <button 
                        className="auth-btn back" 
                        onClick={() => setShowAccountType(false)}
                      >
                        ← Voltar
                      </button>
                    </div>
                  )}

                  <div className="auth-divider">
                    <span>ou</span>
                  </div>

                  <div className="login-options">
                    <button 
                      className="auth-btn outline" 
                      onClick={() => setShowStudentLogin(true)}
                    >
                      <span className="btn-icon">👨‍🎓</span>
                      Entrar como Estudante
                    </button>
                    <button className="auth-btn outline" disabled>
                      <span className="btn-icon">👨‍🏫</span>
                      Entrar como Professor
                    </button>
                    <button className="auth-btn outline" disabled>
                      <span className="btn-icon">🏢</span>
                      Entrar como Empresa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showStudentLogin && (
          <div className="login-modal">
            <div className="modal-overlay" onClick={() => setShowStudentLogin(false)}></div>
            <div className="modal-content">
              <StudentLoginForm onLogin={handleLogin} error={error} />
              <button 
                onClick={() => setShowStudentLogin(false)} 
                className="auth-btn back"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Homepage; 