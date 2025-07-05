import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

const slides = [
  {
    title: 'Novo Curso: React Avançado!',
    subtitle: 'Aprofunde seus conhecimentos em React e destaque-se no mercado.',
    cta: 'Saiba mais',
    bg: '#6699FF',
  },
  {
    title: 'Hackathon Beeedu 2024',
    subtitle: 'Participe do maior evento de inovação para estudantes!',
    cta: 'Inscreva-se',
    bg: '#2F4A60',
  },
  {
    title: 'Mentorias com Experts',
    subtitle: 'Aprenda com profissionais de referência e acelere sua carreira.',
    cta: 'Ver agenda',
    bg: '#22C55E',
  },
];

export default function BannerRotativo() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="banner-rotativo" style={{ background: slides[current].bg }}>
      <div className="banner-content">
        <h2>{slides[current].title}</h2>
        <p>{slides[current].subtitle}</p>
        <button className="banner-cta">{slides[current].cta}</button>
      </div>
      <div className="banner-dots">
        {slides.map((_, i) => (
          <span key={i} className={i === current ? 'dot active' : 'dot'} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
} 