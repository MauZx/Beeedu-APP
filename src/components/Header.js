import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo" aria-label="Beeedu Logo">
          {/* Placeholder SVG logo */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#6699FF" />
            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" dy=".3em">B</text>
          </svg>
        </span>
        <div className="header-social">
          {/* Placeholder social icons */}
          <a href="#" aria-label="Instagram">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#2F4A60"/><circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="1.5"/><circle cx="15.2" cy="4.8" r="1" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#2F4A60"/><rect x="5" y="8" width="2" height="7" fill="#fff"/><rect x="9" y="11" width="2" height="4" fill="#fff"/><circle cx="6" cy="6" r="1" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="X">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#2F4A60"/><path d="M6 6l8 8M14 6l-8 8" stroke="#fff" strokeWidth="1.5"/></svg>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header; 