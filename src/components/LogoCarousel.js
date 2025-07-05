import React, { useEffect, useRef } from 'react';
import './StudentDashboard.css';

const logos = [
  { name: 'EducaPro', src: 'https://dummyimage.com/100x40/6699ff/fff&text=EducaPro' },
  { name: 'BeeJobs', src: 'https://dummyimage.com/100x40/2f4a60/fff&text=BeeJobs' },
  { name: 'StartUpX', src: 'https://dummyimage.com/100x40/22c55e/fff&text=StartUpX' },
  { name: 'MentorHub', src: 'https://dummyimage.com/100x40/facc15/fff&text=MentorHub' },
  { name: 'FreelaNet', src: 'https://dummyimage.com/100x40/ef4444/fff&text=FreelaNet' },
  { name: 'SkillBoost', src: 'https://dummyimage.com/100x40/4b5563/fff&text=SkillBoost' },
  { name: 'JobDraft', src: 'https://dummyimage.com/100x40/22c55e/fff&text=JobDraft' },
];

export default function LogoCarousel() {
  const carouselRef = useRef();
  useEffect(() => {
    let scroll = 0;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        scroll += 1;
        if (scroll > carouselRef.current.scrollWidth / 2) scroll = 0;
        carouselRef.current.scrollLeft = scroll;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);
  // Duplicar logos para efeito infinito
  return (
    <div className="logo-carousel-wrapper">
      <div className="logo-carousel" ref={carouselRef}>
        {[...logos, ...logos].map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.name} className="carousel-logo" />
        ))}
      </div>
    </div>
  );
} 