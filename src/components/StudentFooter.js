import React from 'react';
import './StudentFooter.css';

function StudentFooter() {
  return (
    <footer className="student-footer">
      <div className="footer-col">
        <h4>Sobre</h4>
        <a href="#">Sobre</a>
        <a href="#">Carreiras</a>
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
        <a href="#">Contato</a>
      </div>
      <div className="footer-col">
        <h4>Comunidade</h4>
        <a href="#">Escolas</a>
        <a href="#">Universidades</a>
        <a href="#">Empresas</a>
        <a href="#">Blog</a>
        <a href="#">Podcast</a>
      </div>
      <div className="footer-col">
        <h4>Mais</h4>
        <a href="#">Imprensa</a>
        <a href="#">Investidores</a>
        <a href="#">Ajuda</a>
        <a href="#">Acessibilidade</a>
        <a href="#">Cookies</a>
      </div>
    </footer>
  );
}

export default StudentFooter; 