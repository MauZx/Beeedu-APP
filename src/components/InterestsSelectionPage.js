import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

// Categorias de interesses para ajuda guiada
const INTEREST_CATEGORIES = {
  'Tecnologia e Programação': {
    icon: '💻',
    description: 'Desenvolvimento de software, aplicações e sistemas',
    subcategories: [
      'Desenvolvimento Web',
      'Desenvolvimento Mobile',
      'Ciência de Dados',
      'Inteligência Artificial',
      'Cibersegurança',
      'DevOps',
      'UX/UI Design'
    ]
  },
  'Design e Criatividade': {
    icon: '🎨',
    description: 'Design gráfico, digital e comunicação visual',
    subcategories: [
      'Design Gráfico',
      'Design Digital',
      'Ilustração',
      'Fotografia',
      'Motion Design',
      'Branding',
      'Design de Produto'
    ]
  },
  'Marketing e Vendas': {
    icon: '📈',
    description: 'Marketing digital, vendas e comunicação',
    subcategories: [
      'Marketing Digital',
      'Marketing de Conteúdo',
      'Publicidade',
      'Vendas',
      'Analytics',
      'Social Media',
      'E-commerce'
    ]
  },
  'Administração e Negócios': {
    icon: '💼',
    description: 'Gestão, administração e empreendedorismo',
    subcategories: [
      'Administração',
      'Gestão de Projetos',
      'Recursos Humanos',
      'Finanças',
      'Empreendedorismo',
      'Consultoria',
      'Logística'
    ]
  },
  'Saúde e Bem-estar': {
    icon: '🏥',
    description: 'Saúde, nutrição e qualidade de vida',
    subcategories: [
      'Nutrição',
      'Educação Física',
      'Psicologia',
      'Fisioterapia',
      'Enfermagem',
      'Medicina',
      'Terapias Alternativas'
    ]
  },
  'Educação e Ensino': {
    icon: '📚',
    description: 'Educação, pedagogia e treinamento',
    subcategories: [
      'Pedagogia',
      'Ensino de Idiomas',
      'Treinamento Corporativo',
      'Educação Especial',
      'Tecnologia Educacional',
      'Gestão Escolar',
      'Psicopedagogia'
    ]
  },
  'Engenharia e Construção': {
    icon: '🏗️',
    description: 'Engenharia, arquitetura e construção',
    subcategories: [
      'Engenharia Civil',
      'Engenharia Elétrica',
      'Engenharia Mecânica',
      'Arquitetura',
      'Construção Civil',
      'Engenharia de Produção',
      'Engenharia Ambiental'
    ]
  },
  'Comunicação e Mídia': {
    icon: '📺',
    description: 'Jornalismo, comunicação e produção de mídia',
    subcategories: [
      'Jornalismo',
      'Produção Audiovisual',
      'Rádio e TV',
      'Comunicação Social',
      'Produção de Conteúdo',
      'Podcasting',
      'Streaming'
    ]
  }
};

// Interesses populares para seleção manual
const POPULAR_INTERESTS = [
  'Programação', 'Design', 'Marketing', 'Vendas', 'Administração',
  'Saúde', 'Educação', 'Engenharia', 'Comunicação', 'Arte',
  'Música', 'Esportes', 'Culinária', 'Viagens', 'Fotografia',
  'Escrita', 'Pesquisa', 'Tecnologia', 'Inovação', 'Sustentabilidade'
];

export default function InterestsSelectionPage() {
  const navigate = useNavigate();
  const [selectionMode, setSelectionMode] = useState(null); // 'guided' ou 'manual'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [manualInterests, setManualInterests] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleGuidedSelection = () => {
    setSelectionMode('guided');
    setCurrentStep(2);
  };

  const handleManualSelection = () => {
    setSelectionMode('manual');
    setCurrentStep(2);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep(3);
  };

  const handleSubcategoryToggle = (subcategory) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory)
        ? prev.filter(item => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleManualInterestToggle = (interest) => {
    setManualInterests(prev => 
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const handleAddCustomInterest = (e) => {
    e.preventDefault();
    const input = e.target.elements.customInterest;
    const value = input.value.trim();
    if (value && !manualInterests.includes(value)) {
      setManualInterests(prev => [...prev, value]);
      input.value = '';
    }
  };

  const handleFinish = () => {
    const finalInterests = selectionMode === 'guided' 
      ? selectedSubcategories 
      : manualInterests;
    
    // Salvar interesses no localStorage ou enviar para API
    localStorage.setItem('userInterests', JSON.stringify(finalInterests));
    
    // Redirecionar para o dashboard
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
      setSelectedCategory(null);
      setSelectedSubcategories([]);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setSelectionMode(null);
    }
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
                  <path fill="#6699FF" d="M158.06 443.63c5.66,0.68 11.77,2.28 17.68,3.05 14.49,1.89 30.56,1.89 45.06,0 5.91,-0.77 12.02,-2.37 17.68,-3.05 -1.69,3.69 -16.39,15.2 -20.4,18.3 -3.8,2.94 -6.89,5.75 -10.36,8.72 -4.11,3.52 -7.3,8.24 -9.45,10.07 -4.37,-3.74 -5.65,-7.85 -19.81,-18.8 -4.01,-3.1 -18.81,-14.7 -20.4,-18.3zm-13.11 -329.52l-0 3.32c-5.73,-5.51 -12.11,-10.02 -19.57,-13.51l-0 22.83c0.18,0.08 0.36,0.15 0.56,0.27 2.39,1.42 3.37,4.09 2.91,6.57 0.32,0.3 0.63,0.59 0.95,0.9 3.81,3.67 9.69,10.93 12.3,17.01 -3.35,4.46 -5.34,4.94 -10.84,13.3 -0.53,0.8 -1.04,1.63 -1.54,2.47 0.09,1.28 0.18,2.56 0.26,3.84 0.07,1.15 0.19,2.48 0.13,3.62l-0.09 2.07 -1.91 -0.8c-0.69,-0.29 -0.91,-0.59 -1.46,-0.95 -0.21,-0.13 -0.43,-0.25 -0.65,-0.36 -0.94,2.22 -1.79,4.56 -2.53,6.99 -3.11,10.16 -3.46,21.51 -1.03,32.11 0.8,3.45 2.24,6.67 2.81,9.66l-20.32 6.5c-6.59,2.24 -13.23,4.69 -19.61,7.37 -34.68,14.57 -71.59,38.39 -82.4,79.05 -14.62,55.03 27.84,84.57 76.18,74.91 9.47,-1.89 21.08,-6.35 29.15,-11.34l8.09 -5.42c-0.74,32.55 4.39,57.4 24.9,82.07 13.86,16.67 31.7,24.33 41.47,38.84 1.86,2.77 3.13,5.79 5.56,7.96 5.46,4.87 13.96,5 19.76,0.19 4.42,-3.67 4.61,-10.46 18.56,-21.59 4.87,-3.89 10.3,-7.9 14.81,-11.83 15.13,-13.22 26.01,-26.47 33.01,-47.69 5.47,-16.59 6.2,-29.22 5.76,-47.93l7.85 5.26c8,5.01 19.56,9.46 29.07,11.43 47.82,9.89 91.11,-19.16 76.51,-74.84 -12.85,-49 -67.12,-76.59 -111.95,-89.63 -2.78,-0.81 -8.18,-2.03 -10.38,-3.28 1.28,-6.68 3.54,-8.09 4.3,-19.97 1.11,-17.31 -4.93,-32.7 -15.35,-45.57 -1.94,-2.41 -4.26,-4.38 -5.8,-6.42 2.52,-5.87 8.42,-13.28 12.1,-16.81 4.48,-4.3 10.29,-8.75 17.58,-11.46 11.07,-4.12 19.54,-3.34 23.41,-5.58 6.86,-3.97 7.61,-14.46 0.9,-19.06 -9.58,-6.56 -35.51,3.57 -44.98,9.57 -4.76,3.02 -9.96,7.11 -13.67,10.93l0.01 -4.96c-2.63,-2.08 -19.76,-6.41 -23.9,-7.25 -22.79,-4.63 -47.17,-3.68 -69.39,3.11 -2.37,0.72 -10.18,3.01 -11.54,4.14zm-41.12 -20.42c0.56,0.48 7.36,2.87 8.69,3.37 1.54,0.57 2.92,1.1 4.43,1.65 0.65,0.24 4.07,1.22 4.26,1.93l0 26.72c-0.19,0.69 -0.88,0.28 -2.35,1.87 -0.74,0.79 -1.2,1.79 -1.22,3.13 -0.02,1.25 0.45,2.33 0.99,3.15 0.63,0.95 1.22,1.06 2.13,1.58 0.05,0.02 0.11,0.06 0.15,0.09 0.04,0.02 0.11,0.07 0.15,0.09 0.03,0.02 0.1,0.06 0.15,0.09 -1.87,2.69 -2.42,3.81 -2.72,7.8 -0.24,3.24 -0.46,6.5 -0.69,9.75 -0.45,6.57 -0.87,13.14 -1.37,19.72 2.24,-1.09 4.97,-3.52 9.58,-1.53 0.55,0.24 1.01,0.46 1.44,0.74 0.56,0.35 0.67,0.59 1.24,0.83 0.09,-2.02 -1.08,-16.4 -1.31,-19.67 -0.39,-5.53 -0.2,-14.5 -3.42,-17.64l0.53 -0.33c0.23,-0.13 0.54,-0.28 0.7,-0.38 3.44,-2.16 2.77,-6.76 0.02,-8.39 -0.64,-0.38 -0.93,-0.23 -1.27,-0.9l0.01 -25.97c6.33,2.16 12.66,4.97 18.91,7.07 1.04,0.35 8.05,-2.43 9.62,-2.96 3.36,-1.13 6.85,-2.04 10.35,-2.91 22.88,-5.69 47.09,-5.35 70.13,0.27 3.45,0.84 6.77,1.81 10.11,2.92l7.21 2.57c1.26,0.48 1.31,0.2 2.54,-0.27 6.36,-2.43 12.65,-4.78 19.12,-7.17 2.31,-0.85 18.3,-6.65 18.96,-7.22 -1.12,-0.67 -4.33,-1.67 -5.73,-2.2l-64.3 -24.12c-2.62,-0.98 -22.65,-8.74 -23.49,-8.74 -0.68,0 -72.96,27.29 -81.8,30.6l-11.72 4.46zm141.83 303.19c3.67,-1.06 10.28,-3.72 13.5,-4.21 -0.43,7.1 -1.95,13.89 -3.76,20.31 -1.42,5.05 -1.63,3.83 -6.34,5.58 -30.69,11.38 -71.19,11.32 -101.9,-0.11 -5.03,-1.87 -4.63,-0.54 -6.13,-5.78 -1.78,-6.21 -3.26,-13.11 -3.68,-20.01 2.16,0.33 4.96,1.58 7.12,2.28 27.32,8.81 58.54,10.87 86.72,5.31 4.88,-0.96 9.84,-2.05 14.47,-3.38zm-107.6 -26.64c0.03,-3.94 2.54,-15.17 3.85,-18.67 1.05,-2.8 2.08,-1.41 7.58,0.15 2.95,0.84 5.89,1.62 8.79,2.26 29.75,6.63 59.81,6 89.06,-2.35 5.4,-1.54 6.31,-2.91 7.37,0.24 1.31,3.93 3.72,14.04 3.75,18.36 -3.92,1.17 -8.59,3.31 -12.84,4.75 -24.56,8.26 -55.93,9.7 -81.3,3.66 -4.74,-1.13 -9.22,-2.23 -13.71,-3.76 -4.08,-1.39 -8.74,-3.52 -12.55,-4.65zm21.54 -37.43c0.76,-1.56 4,-5.05 5.25,-6.39 1.78,-1.93 3.61,-4.1 5.28,-6.25 3.35,-4.31 6.6,-8.15 9.99,-12.67 3.24,-4.3 6.42,-8.72 9.55,-13.5l8.58 -13.99c1.04,1.06 3.25,5.44 4.28,7.15 7.98,13.22 14.7,21.44 24.02,33.24 2.13,2.69 9.54,10.74 10.36,12.41 -15.88,2.81 -20.87,4.75 -38.65,4.75 -17.8,0 -22.81,-1.94 -38.66,-4.75zm57.84 -98.33c12.33,-1.26 49.83,9.7 62.03,13.53 32.88,10.31 75.46,30.11 89.9,62.77 9.5,21.49 9.19,43.92 -8.65,54.86 -18.14,11.12 -43.78,6.53 -60.4,-2.91 -4.02,-2.29 -7.88,-5.42 -11,-8.09 -3.73,-3.19 -6.75,-5.96 -10.14,-8.94 -1.7,-1.49 -3.19,-3.12 -4.87,-4.66l-14.28 -14.36c-6,-6.38 -11.83,-13.24 -17.85,-20.32 -5.47,-6.44 -11.18,-14.16 -16.35,-21.81 -4.78,-7.06 -10.21,-15.76 -13.71,-24.5 -3.3,-8.23 -8.16,-24.19 5.32,-25.57zm-44.39 0.07c15.85,-1.73 17.19,7.57 13.13,20.54 -2.88,9.2 -8.25,18.31 -12.78,25.4 -9.58,14.98 -15.02,20.29 -24.7,32.55 -2.8,3.55 -6.12,6.69 -9.05,10.04 -8.02,9.15 -28.5,29.25 -39.33,37 -33.84,24.2 -96.8,13.41 -75.15,-44.54 12.93,-34.6 53.43,-54.94 86.79,-65.87 9.72,-3.19 19.37,-6.06 29.56,-8.61 9.88,-2.46 21.15,-5.37 31.53,-6.5zm-53.3 -132.99c-2.1,-0.79 -4.29,-1.51 -6.56,-2.16 -6.65,-1.9 -18.83,-4.97 -24.86,-0.98 -6.66,4.41 -6.51,14.67 0.17,18.91 5.29,3.36 17.21,1.02 31.24,9.39l0.01 -25.16z"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main" style={{ background: 'var(--cinza-claro)', minHeight: '80vh', padding: '32px 0', color: 'var(--deep-blue)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Step 1: Escolha do modo */}
          {currentStep === 1 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--azul-beeedu)', marginBottom: 16 }}>
                  🎯 Conte-nos sobre seus interesses!
                </h1>
                <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Ajude-nos a encontrar os melhores cursos e oportunidades para você
                </p>
              </div>

              <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div 
                  onClick={handleGuidedSelection}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: 'var(--shadow-card)',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    minWidth: 280,
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--azul-beeedu)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: 'var(--deep-blue)' }}>
                    Quero ajuda para descobrir
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Vamos te guiar através de categorias para encontrar seus interesses específicos
                  </p>
                </div>

                <div 
                  onClick={handleManualSelection}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: 'var(--shadow-card)',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    minWidth: 280,
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--azul-beeedu)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✏️</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: 'var(--deep-blue)' }}>
                    Já sei o que quero
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Selecione seus interesses diretamente da nossa lista ou adicione os seus
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Seleção guiada - Categorias */}
          {currentStep === 2 && selectionMode === 'guided' && (
            <div>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--azul-beeedu)', marginBottom: 8 }}>
                  Escolha uma categoria que mais te interessa
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>
                  Clique em uma categoria para ver as opções específicas
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {Object.entries(INTEREST_CATEGORIES).map(([category, info]) => (
                  <div 
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: 24,
                      boxShadow: 'var(--shadow-card)',
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = 'var(--azul-beeedu)'}
                    onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 32, marginRight: 12 }}>{info.icon}</span>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--deep-blue)' }}>
                        {category}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {info.description}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button 
                  onClick={handleBack}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: '1px solid var(--cinza-card)',
                    background: '#fff',
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  ← Voltar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Seleção guiada - Subcategorias */}
          {currentStep === 3 && selectionMode === 'guided' && selectedCategory && (
            <div>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--azul-beeedu)', marginBottom: 8 }}>
                  {INTEREST_CATEGORIES[selectedCategory].icon} {selectedCategory}
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  {INTEREST_CATEGORIES[selectedCategory].description}
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  Selecione os interesses que mais te chamam atenção (pode selecionar vários)
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                {INTEREST_CATEGORIES[selectedCategory].subcategories.map((subcategory) => (
                  <div 
                    key={subcategory}
                    onClick={() => handleSubcategoryToggle(subcategory)}
                    style={{
                      background: selectedSubcategories.includes(subcategory) ? 'var(--azul-beeedu)' : '#fff',
                      color: selectedSubcategories.includes(subcategory) ? '#fff' : 'var(--deep-blue)',
                      borderRadius: 8,
                      padding: '16px 20px',
                      boxShadow: 'var(--shadow-card)',
                      cursor: 'pointer',
                      border: `2px solid ${selectedSubcategories.includes(subcategory) ? 'var(--azul-beeedu)' : 'transparent'}`,
                      transition: 'all 0.3s ease',
                      textAlign: 'center',
                      fontWeight: 500
                    }}
                  >
                    {subcategory}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={handleBack}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: '1px solid var(--cinza-card)',
                    background: '#fff',
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginRight: 16
                  }}
                >
                  ← Voltar
                </button>
                <button 
                  onClick={handleFinish}
                  disabled={selectedSubcategories.length === 0}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: 'none',
                    background: selectedSubcategories.length > 0 ? 'var(--azul-beeedu)' : 'var(--cinza-card)',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: selectedSubcategories.length > 0 ? 'pointer' : 'not-allowed'
                  }}
                >
                  Finalizar ({selectedSubcategories.length} selecionados)
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Seleção manual */}
          {currentStep === 2 && selectionMode === 'manual' && (
            <div>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--azul-beeedu)', marginBottom: 8 }}>
                  Selecione seus interesses
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>
                  Escolha os interesses que mais te chamam atenção ou adicione os seus
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: 'var(--deep-blue)' }}>
                  Interesses populares
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                  {POPULAR_INTERESTS.map((interest) => (
                    <div 
                      key={interest}
                      onClick={() => handleManualInterestToggle(interest)}
                      style={{
                        background: manualInterests.includes(interest) ? 'var(--azul-beeedu)' : '#fff',
                        color: manualInterests.includes(interest) ? '#fff' : 'var(--deep-blue)',
                        borderRadius: 8,
                        padding: '12px 16px',
                        boxShadow: 'var(--shadow-card)',
                        cursor: 'pointer',
                        border: `2px solid ${manualInterests.includes(interest) ? 'var(--azul-beeedu)' : 'transparent'}`,
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        fontWeight: 500
                      }}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: 'var(--deep-blue)' }}>
                  Adicionar interesse personalizado
                </h3>
                <form onSubmit={handleAddCustomInterest} style={{ display: 'flex', gap: 12 }}>
                  <input
                    type="text"
                    name="customInterest"
                    placeholder="Digite seu interesse..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1px solid var(--cinza-card)',
                      fontSize: 14
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'var(--azul-beeedu)',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Adicionar
                  </button>
                </form>
              </div>

              {manualInterests.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: 'var(--deep-blue)' }}>
                    Seus interesses selecionados ({manualInterests.length})
                  </h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {manualInterests.map((interest) => (
                      <span
                        key={interest}
                        style={{
                          background: 'var(--azul-beeedu-light)',
                          color: 'var(--azul-beeedu)',
                          borderRadius: 20,
                          padding: '8px 16px',
                          fontSize: 14,
                          fontWeight: 500
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={handleBack}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: '1px solid var(--cinza-card)',
                    background: '#fff',
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginRight: 16
                  }}
                >
                  ← Voltar
                </button>
                <button 
                  onClick={handleFinish}
                  disabled={manualInterests.length === 0}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: 'none',
                    background: manualInterests.length > 0 ? 'var(--azul-beeedu)' : 'var(--cinza-card)',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: manualInterests.length > 0 ? 'pointer' : 'not-allowed'
                  }}
                >
                  Finalizar ({manualInterests.length} selecionados)
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 