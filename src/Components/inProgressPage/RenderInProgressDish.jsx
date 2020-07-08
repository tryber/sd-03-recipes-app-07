import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

const renderButtons = (path, favorites, setFavorite, {
  id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
}) => {
  const isFavorite = favorites.find((elem) => elem.id === id);
  const urlPath = `http://localhost:3000${path}`;
  return (
    <div className="buttons-container">
      <button
        data-testid="share-btn"
        onClick={() => { navigator.clipboard.writeText(urlPath); alert('Link copiado!'); }}
        src={shareIcon}
        type="button"
      >
        <img src={shareIcon} alt="Share" />
      </button>
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

const checkIngredients = (id, type, arr, index) => {
  // switch (type) {
  //   case 'comida':
  //     Object.entries(arr.meals).includes(id) ? Object.values()
  //   case 'bebida':
  //   default: return [];
  // }
  // if (arr.includes(index)) {
  //   return arr.filter((elem) => elem !== index);
  // }
  // return [...arr, index];
};

// tomar atenção com o local storage se for o numero do ingrediente ou o nome do ingrediente
const renderIngredients = (id, type, ingredients, measures, checks, func) => (
  <div className="ingredients-container">
    <h3>Ingredientes</h3>
    {ingredients.map((elem, i) => (
      <div key={elem}>
        <input
          checked={checks.meals.includes(elem) || checks.cocktails.includes(elem)}
          onChange={() => func(id, type, checkIngredients(id, type, checks, i))}
          type="checkbox"
        />
        <p
          data-testid={`${i}-ingredient-step`}
          className={checks.meals.includes(elem) || checks.cocktails.includes(elem) ? 'selectedCheckBox' : ''}
        >
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

// const startBtn = (doing, path) => (
//   <div>
//     <Link to={`${path}/in-progress`}>
//       <button
//         className="start-btn"
//         data-testid="start-recipe-btn"
//         type="button"
//       >
//         {doing
//           ? 'Continuar Receita'
//           : 'Iniciar Receita'}
//       </button>
//     </Link>
//   </div>
// );

const RenderDish = ({
  id, type, area, drinkCategory, alcoholicOrNot, path, favorites, thumb, title,
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
      <div className="recipe-header">
        {renderTitles(title, category)}
        {renderButtons(path, favorites, setFavorite, {
          id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb,
        })}
      </div>
      {renderIngredients(id, type, ingredients, measures, checks, func)}
      {renderIntructions(instructions)}
    </div>
    {/* !done && startBtn(done, path) */}
  </div>
);

RenderDish.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  drinkCategory: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  thumb: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  instructions: PropTypes.string.isRequired,
  setFavorite: PropTypes.func.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
  func: PropTypes.func.isRequired,
};

export default RenderDish;
