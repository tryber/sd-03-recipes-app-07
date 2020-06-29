import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { recipeContext } from '../Hooks/recipeContext';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const SearchButton = () => (
    <button data-testid="search-top-btn">
      <img src={searchIcon} alt="botao-de-busca" />
    </button>
  );

const Header = () => {

  const { titlePage } = useContext(recipeContext);

  return (
    <nav>
      <Link to="/perfil" data-testid="profile-top-btn">
        <img
          alt="titulo"
          src={profile}
        />
      </Link>
      <h1 data-testid="page-title">{titlePage}</h1>
      {SearchButton()}
    </nav>
  );
};

export default Header;
