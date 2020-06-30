import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { recipeContext } from '../Hooks/recipeContext';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { requestRadioButtons } from '../Services/requestsAPI';

const SearchButtonShow = (callBack, value) => (
  <button
    data-testid="search-top-btn"
    onClick={() => callBack(value)}
  >
    <img src={searchIcon} alt="botao-de-busca" />
  </button>
);

const radioButtons = (callBack) => (
  <div className="radios-box">
    <input
      value="ingredients"
      type="radio"
      name="selectButtonsradios"
      data-testid="ingredient-search-radio"
      onChange={(event) => callBack(event.target.value)}
    />
    <label htmlFor="selectButtonsradios">Ingredientes</label>
    <input
      value="name"
      type="radio"
      name="selectButtonsradios"
      data-testid="name-search-radio"
      onChange={(event) => callBack(event.target.value)}
    />
    <label htmlFor="selectButtonsradios">Nome</label>
    <input
      value="letterFirst"
      type="radio"
      name="selectButtonsradios"
      data-testid="first-letter-search-radio"
      onChange={(event) => callBack(event.target.value)}
    />
    <label htmlFor="selectButtonsradios">Primeira letra</label>
  </div>
);

const SearchBar = (callBackRadios, callBackSearchInput) => (
  <div>
    <label htmlFor="searchInput">
      <input
        name="searchInput"
        type="text"
        data-testid="search-input"
        placeholder="Buscar receitas"
        onChange={(event) => callBackSearchInput(event.target.value)}
      />
    </label>
    {radioButtons(callBackRadios)}
  </div>
);

const searchButton = (btnSelected, searchValue, setBtnFunc, location) => (
  <button
    data-testid="exec-search-btn"
    onClick={() => {
      if (btnSelected === 'letterFirst' && searchValue.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        requestRadioButtons(btnSelected, searchValue, location)
          .then((res) => {
            if (Object.values(res)[0] === null) {
              alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
            } else {
              setBtnFunc(res);
            }
          });
      }
    }}
  >
    Buscar
  </button>
);


const Header = () => {
  const location = useLocation().pathname;
  const { titlePage, setRadioBtnFilteredFun } = useContext(recipeContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [btnSelected, setBtnSel] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <nav>
      <Link to="/perfil" data-testid="profile-top-btn">
        <img
          alt="titulo"
          src={profile}
        />
      </Link>
      <h1 data-testid="page-title">{titlePage}</h1>
      {SearchButtonShow(setShowSearchBar, !showSearchBar)}
      {showSearchBar && SearchBar(setBtnSel, setSearchValue)}
      {showSearchBar && searchButton(btnSelected, searchValue, setRadioBtnFilteredFun, location)}
    </nav>
  );
};

export default Header;
