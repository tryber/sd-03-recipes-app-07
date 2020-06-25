import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/perfil">
      <img
        alt="titulo"
        src="../images/profileIcon.svg"
      />
    </Link>
    <Link to="/">Título</Link>
    <Link to="/">Busca</Link>
  </nav>
);

export default Header;
