import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

// Estrutura dos níveis e insígnias
const LEVELS = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1;
  const points = Math.round(100 * Math.pow(1.5, i));
  return { level, points };
});

const BADGES = [
  { level: 0, name: 'Melzinho na Chupeta' },
  { level: 5, name: 'Bem-vindo à Colmeia!' },
  { level: 10, name: 'Guardião das Abelhas' },
  { level: 15, name: 'Explorador das Bombus' },
  { level: 20, name: 'Amigo das Trigonas' },
  { level: 25, name: 'Guardião da Abelha-Canudo' },
  { level: 30, name: 'Protetor das Nativas' },
  { level: 35, name: 'Guardião das Abelhas Solitárias' },
  { level: 40, name: 'Amigo das Sem Ferrão' },
  { level: 45, name: 'Protetor das Jataís' },
  { level: 50, name: 'Defensor das Mandaçaias' },
  { level: 55, name: 'Protetor das Manduris' },
  { level: 60, name: 'Guardião da Abelha-Iraí' },
  { level: 65, name: 'Sentinela das Tubunas' },
  { level: 70, name: 'Guardião das Borás' },
  { level: 75, name: 'Amigo da Abelha-Arapuã' },
  { level: 80, name: 'Observador das Plebeias' },
  { level: 85, name: 'Explorador das Meliponas' },
  { level: 90, name: 'Defensor da Abelha-Mirim' },
  { level: 95, name: 'Sentinela do Mel' },
  { level: 100, name: 'Defensor das Polinizadoras + Estudante 100% Empenhado' },
];

// Exemplo de progresso do usuário
const userProgress = {
  currentPoints: 4200,
  unlockedBadges: BADGES.filter(b => b.level <= 17),
};

function getBadgeForLevel(level) {
  let badge = BADGES[0];
  for (let i = 0; i < BADGES.length; i++) {
    if (level >= BADGES[i].level) badge = BADGES[i];
  }
  return badge;
}

function getLevelByPoints(points) {
  let level = 1;
  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].points) {
      level = LEVELS[i].level;
    } else {
      break;
    }
  }
  return level;
}

export default function ProgressPage() {
  // Calcular nível a partir dos pontos
  const currentLevel = getLevelByPoints(userProgress.currentPoints);
  const currentLevelObj = LEVELS[currentLevel - 1];
  const nextLevelObj = LEVELS[currentLevel] || LEVELS[LEVELS.length - 1];
  const pointsForCurrent = currentLevelObj ? currentLevelObj.points : 0;
  const pointsForNext = nextLevelObj ? nextLevelObj.points : pointsForCurrent;
  const progressPercent = Math.min(100, ((userProgress.currentPoints - pointsForCurrent) / (pointsForNext - pointsForCurrent)) * 100);
  const currentBadge = getBadgeForLevel(currentLevel);

  return (
    <div className="student-dashboard">
      {/* Header igual ao StudentDashboard */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3266.66 593.2" width="160" aria-label="Beeedu Logo">
              <g id="Layer_x0020_1">
                <g id="_2768876670848">
                  <g transform="matrix(1 0 0 1 -1216.41 283.597)">
                    <text x="1633.33" y="296.6" fill="#6699FF" fontWeight="500" fontSize="664.41" fontFamily="sans-serif">BEEEDU</text>
                  </g>
                  <path fill="#6699FF" d="M158.06 443.63c5.66,0.68 11.77,2.28 17.68,3.05 14.49,1.89 30.56,1.89 45.06,0 5.91,-0.77 12.02,-2.37 17.68,-3.05 -1.69,3.69 -16.39,15.2 -20.4,18.3 -3.8,2.94 -6.89,5.75 -10.36,8.72 -4.11,3.52 -7.3,8.24 -9.45,10.07 -4.37,-3.74 -5.65,-7.85 -19.81,-18.8 -4.01,-3.1 -18.81,-14.7 -20.4,-18.3zm-13.11 -329.52l-0 3.32c-5.73,-5.51 -12.11,-10.02 -19.57,-13.51l-0 22.83c0.18,0.08 0.36,0.15 0.56,0.27 2.39,1.42 3.37,4.09 2.91,6.57 0.32,0.3 0.63,0.59 0.95,0.9 3.81,3.67 9.69,10.93 12.3,17.01 -3.35,4.46 -5.34,4.94 -10.84,13.3 -0.53,0.8 -1.04,1.63 -1.54,2.47 0.09,1.28 0.18,2.56 0.26,3.84 0.07,1.15 0.19,2.48 0.13,3.62l-0.09 2.07 -1.91 -0.8c-0.69,-0.29 -0.91,-0.59 -1.46,-0.95 -0.21,-0.13 -0.43,-0.25 -0.65,-0.36 -0.94,2.22 -1.79,4.56 -2.53,6.99 -3.11,10.16 -3.46,21.51 -1.03,32.11 0.8,3.45 2.24,6.67 2.81,9.66l-20.32 6.5c-6.59,2.24 -13.23,4.69 -19.61,7.37 -34.68,14.57 -71.59,38.39 -82.4,79.05 -14.62,55.03 27.84,84.57 76.18,74.91 9.47,-1.89 21.08,-6.35 29.15,-11.34l8.09 -5.42c-0.74,32.55 4.39,57.4 24.9,82.07 13.86,16.67 31.7,24.33 41.47,38.84 1.86,2.77 3.13,5.79 5.56,7.96 5.46,4.87 13.96,5 19.76,0.19 4.42,-3.67 4.61,-10.46 18.56,-21.59 4.87,-3.89 10.3,-7.9 14.81,-11.83 15.13,-13.22 26.01,-26.47 33.01,-47.69 5.47,-16.59 6.2,-29.22 5.76,-47.93l7.85 5.26c8,5.01 19.56,9.46 29.07,11.43 47.82,9.89 91.11,-19.16 76.51,-74.84 -12.85,-49 -67.12,-76.59 -111.95,-89.63 -2.78,-0.81 -8.18,-2.03 -10.38,-3.28 1.28,-6.68 3.54,-8.09 4.3,-19.97 1.11,-17.31 -4.93,-32.7 -15.35,-45.57 -1.94,-2.41 -4.26,-4.38 -5.8,-6.42 2.52,-5.87 8.42,-13.28 12.1,-16.81 4.48,-4.3 10.29,-8.75 17.58,-11.46 11.07,-4.12 19.54,-3.34 23.41,-5.58 6.86,-3.97 7.61,-14.46 0.9,-19.06 -9.58,-6.56 -35.51,3.57 -44.98,9.57 -4.76,3.02 -9.96,7.11 -13.67,10.93l0.01 -4.96c-2.63,-2.08 -19.76,-6.41 -23.9,-7.25 -22.79,-4.63 -47.17,-3.68 -69.39,3.11 -2.37,0.72 -10.18,3.01 -11.54,4.14zm-41.12 -20.42c0.56,0.48 7.36,2.87 8.69,3.37 1.54,0.57 2.92,1.1 4.43,1.65 0.65,0.24 4.07,1.22 4.26,1.93l0 26.72c-0.19,0.69 -0.88,0.28 -2.35,1.87 -0.74,0.79 -1.2,1.79 -1.22,3.13 -0.02,1.25 0.45,2.33 0.99,3.15 0.63,0.95 1.22,1.06 2.13,1.58 0.05,0.02 0.11,0.06 0.15,0.09 0.04,0.02 0.11,0.07 0.15,0.09 0.03,0.02 0.1,0.06 0.15,0.09 -1.87,2.69 -2.42,3.81 -2.72,7.8 -0.24,3.24 -0.46,6.5 -0.69,9.75 -0.45,6.57 -0.87,13.14 -1.37,19.72 2.24,-1.09 4.97,-3.52 9.58,-1.53 0.55,0.24 1.01,0.46 1.44,0.74 0.56,0.35 0.67,0.59 1.24,0.83 0.09,-2.02 -1.08,-16.4 -1.31,-19.67 -0.39,-5.53 -0.2,-14.5 -3.42,-17.64l0.53 -0.33c0.23,-0.13 0.54,-0.28 0.7,-0.38 3.44,-2.16 2.77,-6.76 0.02,-8.39 -0.64,-0.38 -0.93,-0.23 -1.27,-0.9l0.01 -25.97c6.33,2.16 12.66,4.97 18.91,7.07 1.04,0.35 8.05,-2.43 9.62,-2.96 3.36,-1.13 6.85,-2.04 10.35,-2.91 22.88,-5.69 47.09,-5.35 70.13,0.27 3.45,0.84 6.77,1.81 10.11,2.92l7.21 2.57c1.26,0.48 1.31,0.2 2.54,-0.27 6.36,-2.43 12.65,-4.78 19.12,-7.17 2.31,-0.85 18.3,-6.65 18.96,-7.22 -1.12,-0.67 -4.33,-1.67 -5.73,-2.2l-64.3 -24.12c-2.62,-0.98 -22.65,-8.74 -23.49,-8.74 -0.68,0 -72.96,27.29 -81.8,30.6l-11.72 4.46zm141.83 303.19c3.67,-1.06 10.28,-3.72 13.5,-4.21 -0.43,7.1 -1.95,13.89 -3.76,20.31 -1.42,5.05 -1.63,3.83 -6.34,5.58 -30.69,11.38 -71.19,11.32 -101.9,-0.11 -5.03,-1.87 -4.63,-0.54 -6.13,-5.78 -1.78,-6.21 -3.26,-13.11 -3.68,-20.01 2.16,0.33 4.96,1.58 7.12,2.28 27.32,8.81 58.54,10.87 86.72,5.31 4.88,-0.96 9.84,-2.05 14.47,-3.38zm-107.6 -26.64c0.03,-3.94 2.54,-15.17 3.85,-18.67 1.05,-2.8 2.08,-1.41 7.58,0.15 2.95,0.84 5.89,1.62 8.79,2.26 29.75,6.63 59.81,6 89.06,-2.35 5.4,-1.54 6.31,-2.91 7.37,0.24 1.31,3.93 3.72,14.04 3.75,18.36 -3.92,1.17 -8.59,3.31 -12.84,4.75 -24.56,8.26 -55.93,9.7 -81.3,3.66 -4.74,-1.13 -9.22,-2.23 -13.71,-3.76 -4.08,-1.39 -8.74,-3.52 -12.55,-4.65zm21.54 -37.43c0.76,-1.56 4,-5.05 5.25,-6.39 1.78,-1.93 3.61,-4.1 5.28,-6.25 3.35,-4.31 6.6,-8.15 9.99,-12.67 3.24,-4.3 6.42,-8.72 9.55,-13.5l8.58 -13.99c1.04,1.06 3.25,5.44 4.28,7.15 7.98,13.22 14.7,21.44 24.02,33.24 2.13,2.69 9.54,10.74 10.36,12.41 -15.88,2.81 -20.87,4.75 -38.65,4.75 -17.8,0 -22.81,-1.94 -38.66,-4.75zm57.84 -98.33c12.33,-1.26 49.83,9.7 62.03,13.53 32.88,10.31 75.46,30.11 89.9,62.77 9.5,21.49 9.19,43.92 -8.65,54.86 -18.14,11.12 -43.78,6.53 -60.4,-2.91 -4.02,-2.29 -7.88,-5.42 -11,-8.09 -3.73,-3.19 -6.75,-5.96 -10.14,-8.94 -1.7,-1.49 -3.19,-3.12 -4.87,-4.66l-14.28 -14.36c-6,-6.38 -11.83,-13.24 -17.85,-20.32 -5.47,-6.44 -11.18,-14.16 -16.35,-21.81 -4.78,-7.06 -10.21,-15.76 -13.71,-24.5 -3.3,-8.23 -8.16,-24.19 5.32,-25.57zm-44.39 0.07c15.85,-1.73 17.19,7.57 13.13,20.54 -2.88,9.2 -8.25,18.31 -12.78,25.4 -9.58,14.98 -15.02,20.29 -24.7,32.55 -2.8,3.55 -6.12,6.69 -9.05,10.04 -8.02,9.15 -28.5,29.25 -39.33,37 -33.84,24.2 -96.8,13.41 -75.15,-44.54 12.93,-34.6 53.43,-54.94 86.79,-65.87 9.72,-3.19 19.37,-6.06 29.56,-8.61 9.88,-2.46 21.15,-5.37 31.53,-6.5zm-53.3 -132.99c-2.1,-0.79 -4.29,-1.51 -6.56,-2.16 -6.65,-1.9 -18.83,-4.97 -24.86,-0.98 -6.66,4.41 -6.51,14.67 0.17,18.91 5.29,3.36 17.21,1.02 31.24,9.39l0.01 -25.16z"/>
                </g>
              </g>
            </svg>
          </div>
          <div className="socials">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>
        <nav className="header-menu">
          <Link to="/" className="active">INÍCIO</Link>
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
          <img src="https://ui-avatars.com/api/?name=Aluno" alt="Perfil" className="profile-pic" />
          <Link to="/progresso" className="level-badge" style={{ textDecoration: 'none' }}>
            <span className="level">Lv. 12</span>
            <span className="badge">🏅</span>
          </Link>
        </div>
      </header>
      <main className="dashboard-main" style={{ background: 'var(--cinza-claro)', minHeight: '80vh', padding: '32px 0', color: 'var(--deep-blue)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
          {/* Barra de progresso inspirada na imagem */}
          <div style={{ background: 'var(--azul-beeedu)', borderRadius: 16, padding: 32, boxShadow: 'var(--shadow-card)', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--azul-beeedu-light)', minWidth: 80, textAlign: 'center' }}>{currentLevel}</span>
              <div style={{ flex: 1, margin: '0 24px', position: 'relative' }}>
                <div style={{ height: 28, background: 'var(--cinza-card)', borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 0 8px var(--azul-beeedu-light)' }}>
                  <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, var(--azul-beeedu-light) 60%, var(--azul-beeedu) 100%)', boxShadow: '0 0 16px var(--azul-beeedu-light)', transition: 'width 0.7s cubic-bezier(.4,2,.6,1)' }}></div>
                </div>
                <div style={{ position: 'absolute', left: `${progressPercent}%`, top: -32, transform: 'translateX(-50%)', color: 'var(--azul-beeedu-light)', fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap' }}>
                  +{userProgress.currentPoints - pointsForCurrent} XP
                </div>
              </div>
              <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--azul-beeedu-light)', minWidth: 80, textAlign: 'center' }}>{currentLevel + 1}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 600, fontSize: 18 }}>Rank Atual</span>
              <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 600, fontSize: 18 }}>faltam {Math.abs(pointsForNext - userProgress.currentPoints).toLocaleString()} XP para o próximo nível!</span>
            </div>
          </div>

          {/* Detalhes de pontuação e insígnias */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ background: 'var(--azul-beeedu)', borderRadius: 12, padding: 24, minWidth: 260, flex: 1, boxShadow: 'var(--shadow-card)' }}>
              <div style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{userProgress.currentPoints.toLocaleString()}</div>
              <div style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>Total de Pontos</div>
              <div style={{ marginTop: 16, color: 'var(--azul-beeedu-light)', fontWeight: 600, fontSize: 18 }}>Insígnia Atual</div>
              <div style={{ fontSize: 22, marginTop: 4, color: '#fff' }}>{currentBadge.name}</div>
            </div>
            <div style={{ background: 'var(--azul-beeedu)', borderRadius: 12, padding: 24, minWidth: 260, flex: 1, boxShadow: 'var(--shadow-card)' }}>
              <div style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Como ganhar pontos?</div>
              <ul style={{ color: '#fff', fontSize: 15, lineHeight: 1.7, margin: 0, padding: 0, listStyle: 'none' }}>
                <li>• Conclusão de módulo de curso: <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700 }}>+25</span></li>
                <li>• Conclusão de curso com certificado: <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700 }}>+150</span></li>
                <li>• Verificação de conta (e-mail + celular): <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700 }}>+200</span></li>
                <li>• Conclusão de freela: <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700 }}>+225</span></li>
                <li>• Conclusão de projeto: <span style={{ color: 'var(--azul-beeedu-light)', fontWeight: 700 }}>+575</span></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      {/* Footer igual ao StudentDashboard */}
      <footer className="dashboard-footer">
        <div className="footer-col">
          <h4 style={{color:"#6699FF"}}>Sobre</h4>
          <a href="#">Quem Somos</a>
          <a href="#">Missão</a>
          <a href="#">Contato</a>
        </div>
        <div className="footer-col">
          <h4 style={{color:"#6699FF"}}>Comunidade</h4>
          <a href="#">Escolas</a>
          <a href="#">Faculdades</a>
          <a href="#">Empresas</a>
          <a href="#">Blog</a>
          <a href="#">Podcast</a>
        </div>
        <div className="footer-col">
          <h4 style={{color:"#6699FF"}}>Mais</h4>
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