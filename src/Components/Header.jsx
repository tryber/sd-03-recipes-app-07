import React, { useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { recipeContext } from '../Hooks/recipeContext';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const SearchButton = (callBack, value) => (
  <button
    data-testid="search-top-btn"
    onClick={() => callBack(value)}
  >
    <img src={searchIcon} alt="botao-de-busca" />
  </button>
);

const radioButtons = () => (
  <div className="radios-box">
    <input
      value="ingredients"
      type="radio"
      name="selectButtonsradios"
      data-testid="ingredient-search-radio"
      onChange={(event) => console.log(event.target.value)}
    />
    <label htmlFor="selectButtonsradios">Ingredientes</label>
    <input
      value="name"
      type="radio"
      name="selectButtonsradios"
      data-testid="name-search-radio"
      onChange={(event) => console.log(event.target.value)}
    />
    <label htmlFor="selectButtonsradios">Nome</label>
    <input
      value="letterFirst"
      type="radio"
      name="selectButtonsradios"
      data-testid="first-letter-search-radio"
      onChange={(event) => console.log(event.target.value)}
    />
    <label htmlFor="selectButtonsradios">Primeira letra</label>
  </div>
);

const SearchBar = () => (
  <div>
    <label htmlFor="searchInput">
      <input
        name="searchInput"
        type="text"
        data-testid="search-input"
        placeholder="Buscar receitas"
      />
    </label>
    {radioButtons()}
  </div>
);

const Header = () => {

  const { titlePage, foods } = useContext(recipeContext);
  console.log('fernando:',foods)
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <nav>
      <Link to="/perfil" data-testid="profile-top-btn">
        <img
          alt="titulo"
          src={profile}
        />
      </Link>
      <h1 data-testid="page-title">{titlePage}</h1>
      {SearchButton(setShowSearchBar, !showSearchBar)}
      {showSearchBar && SearchBar()}
      
    </nav>
  );
};

export default Header;
