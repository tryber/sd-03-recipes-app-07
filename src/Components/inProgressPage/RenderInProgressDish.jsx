import React from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../Layout/RenderInProgressDish.css';

const renderTitles = (title, category) => (
  <div className="titles-container">
    <h2 data-testid="recipe-title">{title}</h2>
    <h3 data-testid="recipe-category">{category}</h3>
  </div>
);

const shareRecipe = (urlPath, callback) => {
  navigator.clipboard.writeText(urlPath);
  callback(true);
  setTimeout(() => callback(false), 2000);
};

const renderButtons = (path, favorites, setFavorite, callback, state, {
  id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
}) => {
  const isFavorite = favorites.find((elem) => elem.id === id);
  const urlPath = `http://localhost:3000${path}`;
  return (
    <div className="buttons-container">
      <button
        data-testid="share-btn"
        onClick={() => { navigator.clipboard.writeText(urlPath); shareRecipe(urlPath, callback); }}
        src={shareIcon}
        type="button"
      >
        <img src={shareIcon} alt="Share" />
      </button>
      {state && <span>Link copiado!</span>}
      <button
        data-testid="favorite-btn"
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        onClick={() => setFavorite(
          id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
        )}
        type="button"
      >
        {isFavorite
          ? <img src={blackHeartIcon} alt="is favorite" />
          : <img src={whiteHeartIcon} alt="not favorite" />}
      </button>
    </div>
  );
};

const renderHeading = (path, favorites, setFavorite, callback, state, {
  id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
}) => (
  <div className="recipe-header">
    {renderTitles(title, category)}
    {renderButtons(path, favorites, setFavorite, callback, state, {
      id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
    })}
  </div>
);

const checkIfIncludes = (id, i, checks, type) => {
  const arrCom = Object.keys(checks.meals).find((elem) => elem === id);
  const arrBeb = Object.keys(checks.cocktails).find((elem) => elem === id);
  if (type === 'comida' && arrCom) {
    return [
      Object.entries(checks.meals).find((elem) => elem[0] === id.toString())[1].includes(i),
      Object.entries(checks.meals).find((elem) => elem[0] === id.toString()),
    ];
  } if (type === 'bebida' && arrBeb) {
    return [
      Object.entries(checks.cocktails).find((elem) => elem[0] === id.toString())[1].includes(i),
      Object.entries(checks.cocktails).find((elem) => elem[0] === id.toString()),
    ];
  }
  return [false, []];
};

const renderIngredients = (id, type, ingredients, measures, checks, setLS, callback) => (
  <div className="ingredients-container">
    <h3>Ingredientes</h3>
    {ingredients.map((elem, i) => (
      <div data-testid={`${i}-ingredient-step`} key={elem}>
        <input
          checked={checkIfIncludes(id, i, checks, type)[0]}
          onChange={() => setLS(id, type, i, checkIfIncludes(id, i, checks, type)[1], callback)}
          type="checkbox"
        />
        <p className={checkIfIncludes(id, i, checks, type)[0] ? 'selectedCheckBox' : ''}>
          {`- ${elem} - ${measures[i]}`}
        </p>
      </div>
    ))}
  </div>
);

const renderIntructions = (instructions) => (
  <div className="instructions-container">
    <h3>Instruções</h3>
    <p data-testid="instructions">{instructions}</p>
  </div>
);

const checkIfAllMarket = (ingredients, id, type, arr) => {
  const food = Object.entries(arr.meals).find((elem) => elem[0] === id);
  const drink = Object.entries(arr.cocktails).find((elem) => elem[0] === id);
  if (type === 'comida' && food) {
    return food[1].length === ingredients.length;
  }
  if (type === 'bebida' && drink) {
    return drink[1].length === ingredients.length;
  }
  return false;
};

const startBtn = (done) => (
  <div>
    <Link to="/receitas-feitas">
      <button
        className="finish-btn"
        data-testid="finish-recipe-btn"
        disabled={!done}
        type="button"
      >
        Finalizar receita
      </button>
    </Link>
  </div>
);

const RenderDish = (callback, state, {
  id, type, area, drinkCategory, alcoholicOrNot = '', path, favorites, thumb, title,
  category, ingredients, measures, instructions, setFavorite, checks, func,
}) => (
  <div>
    <img
      alt="food or beverage"
      className="recipe-img"
      data-testid="recipe-photo"
      src={thumb}
    />
    <div className="recipe-container">
      {renderHeading(path, favorites, setFavorite, callback, state, {
        id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
      })}
      {renderIngredients(id, type, ingredients, measures, checks, func[0], func[1])}
      {renderIntructions(instructions)}
    </div>
    {startBtn(checkIfAllMarket(ingredients, id, type, checks))}
  </div>
);

export default RenderDish;
