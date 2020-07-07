import React, { useContext, useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { recipeContext } from '../Hooks/recipeContext';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { requestRadioButtons } from '../Services/requestsAPI';
import '../Layout/Header.css';

const SearchButtonShow = (callBack, value) => (
  <button
    type="button"
    data-testid="search-top-btn"
    onClick={() => callBack(value)}
    className="btn-show"
  >
    <img src={searchIcon} alt="botao-de-busca" />
  </button>
);

const radioButtons = (callBack) => (
  <div className="radios-box">
    <input
      className="radios-inputs"
      value="ingredients"
      type="radio"
      name="selectButtonsradios"
      data-testid="ingredient-search-radio"
      onChange={(event) => callBack(event.target.value)}
    />
    <label className="labels-radios" htmlFor="selectButtonsradios">Ingredientes</label>
    <input
      className="radios-inputs"
      value="name"
      type="radio"
      name="selectButtonsradios"
      data-testid="name-search-radio"
      onChange={(event) => callBack(event.target.value)}
    />
    <label className="labels-radios" htmlFor="selectButtonsradios">Nome</label>
    <input
      className="radios-inputs"
      value="letterFirst"
      type="radio"
      name="selectButtonsradios"
      data-testid="first-letter-search-radio"
      onChange={(event) => callBack(event.target.value)}
    />
    <label className="labels-radios" htmlFor="selectButtonsradios">Primeira letra</label>
  </div>
);

const SearchBar = (callBackRadios, callBackSearchInput) => (
  <div className="search-bar-container">
    <label htmlFor="searchInput">
      <input
        className="search-input"
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

const searchButtonOnClick = (btnSelected, searchValue, location, setBtnFunc) => {
  requestRadioButtons(btnSelected, searchValue, location)
    .then((res) => {
      const objValue = Object.values(res)[0];
      if (objValue === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setBtnFunc(res);
      }
    });
};

const redirectRecipeDetails = (radioBtnFiltered, location) => {
  let oneRecipe = [''];
  let id = '';
  if (radioBtnFiltered) {
    oneRecipe = Object.values(radioBtnFiltered);
    if (location === '/comidas') {
      id = oneRecipe[0][0].idMeal;
    } else if (location === '/bebidas') {
      id = oneRecipe[0][0].idDrink;
    }
  }
  const object = {
    oneRecipe: oneRecipe[0],
    id,
  };
  return object;
};

const titlePage = (location) => {
  let title = '';
  switch (location) {
    case '/comidas':
      title = 'Comidas';
      break;
    case '/bebidas':
      title = 'Bebidas';
      break;
    case '/explorar':
      title = 'Explorar';
      break;
    case '/explorarcomidas':
      title = 'Explorar Comidas';
      break;
    case '/explorarbebidas':
      title = 'Explorar Bebidas';
      break;
    case '/exploraringredientes':
      title = 'Explorar Ingredientes';
      break;
    case '/explorarorigem':
      title = 'Explorar Origem';
      break;
    case '/receitasfeitas':
      title = 'Receitas Favoritas';
      break;
    case '/perfil':
      title = 'Perfil';
      break;
    default:
      title = '';
  }
  return title;
};

const searchButton = (btnSelected, searchValue, setBtnFunc, location) => (
  <button
    className="search-button"
    type="button"
    data-testid="exec-search-btn"
    onClick={() => {
      if (btnSelected === 'letterFirst' && searchValue.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        searchButtonOnClick(btnSelected, searchValue, location, setBtnFunc);
      }
    }}
  >
    Buscar
  </button>
);

const searchHeaderShow = (location) => {
  if (location === '/comidas' || location === '/bebidas' || location === '/explorarorigem')
    return true;
  return false;
};

const Header = () => {
  const location = useLocation().pathname;
  const { setRadioBtnFilteredFun, radioBtnFiltered } = useContext(recipeContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [btnSelected, setBtnSel] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const lengthRecipeList = redirectRecipeDetails(radioBtnFiltered, location).oneRecipe.length;
  const idRecipe = redirectRecipeDetails(radioBtnFiltered, location).id;
  if (lengthRecipeList === 1) return <Redirect to={`${location}/${idRecipe}`} />;
  if (showSearchBar) {
    window.addEventListener('scroll', () => {
      setShowSearchBar(false);
    });
  }
  return (
    <nav>
      <div className="nav-header-container">
        <Link to="/perfil" data-testid="profile-top-btn">
          <img
            alt="titulo"
            src={profile}
          />
        </Link>
        <h1
          data-testid="page-title"
          className="page-title"
        >
          {titlePage(location)}</h1>
        {searchHeaderShow(location) && SearchButtonShow(setShowSearchBar, !showSearchBar)}
        {showSearchBar && SearchBar(setBtnSel, setSearchValue)}
      </div>
      {
        showSearchBar
        &&
        searchButton(btnSelected, searchValue, setRadioBtnFilteredFun, location)
      }
    </nav>
  );
};

export default Header;
