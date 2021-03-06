import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import renderButtons from './DetailsButtons';
import '../Layout/DetailsPage.css';

const renderTitles = (title, category) => (
  <div className="titles-container">
    <h2 data-testid="recipe-title">{title}</h2>
    <h3 data-testid="recipe-category">{category}</h3>
  </div>
);

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

const renderIngredients = (ingredients, measures) => (
  <div className="ingredients-container">
    <h3>Ingredientes</h3>
    {ingredients.map((elem, i) => (
      <p
        data-testid={`${i}-ingredient-name-and-measure`}
        key={elem}
      >
        {`- ${elem} - ${measures[i]}`}
      </p>
    ))}
  </div>
);

const renderIntructions = (instructions) => (
  <div className="instructions-container">
    <h3>Instruções</h3>
    <p data-testid="instructions">{instructions}</p>
  </div>
);

const renderRecomendations = (recom) => {
  if (!recom[0].strDrink) {
    return (
      <div className="recom-container">
        {recom.map((elem, i) => (
          <Link key={elem.strMeal} to={`/comidas/${elem.idMeal}`}>
            <div data-testid={`${i}-recomendation-card`} className="card">
              <h3 className="title-c" data-testid={`${i}-recomendation-title`}>{elem.strMeal}</h3>
              <img alt="Card recipe name" className="cardImage" src={elem.strMealThumb} />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="recom-container">
      {recom.map((elem, i) => (
        <Link key={elem.strDrink} to={`/bebidas/${elem.idDrink}`}>
          <div data-testid={`${i}-recomendation-card`} className="card">
            <h3 className="title-c" data-testid={`${i}-recomendation-title`}>{elem.strDrink}</h3>
            <img alt="Card recipe name" className="cardImage" src={elem.strDrinkThumb} />
          </div>
        </Link>
      ))}
    </div>
  );
};

const startBtn = (checks, path, id) => (
  <div>
    <Link to={`${path}/in-progress`}>
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        {Object.keys(checks.cocktails).includes(id) || Object.keys(checks.meals).includes(id)
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </button>
    </Link>
  </div>
);

const RenderDish = ({ dish, share: state, set: callback }) => {
  const {
    id, type, area, checks, drinkCategory, alcoholicOrNot = '', done, path, favorites, thumb,
    title, category, ingredients, measures, instructions, recom, video = '', setFavorite,
  } = dish;
  return (
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
        {renderIngredients(ingredients, measures)}
        {renderIntructions(instructions)}
        {video && (
          <iframe
            className="instruction-video"
            data-testid="video"
            src={video}
            title="Video"
            frameBorder="0"
          />
        )}
        {renderRecomendations(recom)}
      </div>
      {!done && startBtn(checks, path, id)}
    </div>
  );
};

RenderDish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    checks: PropTypes.shape({
      cocktails: PropTypes.objectOf(PropTypes.array),
      meals: PropTypes.objectOf(PropTypes.array),
    }),
    drinkCategory: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    done: PropTypes.bool,
    path: PropTypes.string,
    favorites: PropTypes.arrayOf(PropTypes.object),
    thumb: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measures: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.string,
    recom: PropTypes.arrayOf(PropTypes.object),
    video: PropTypes.string,
    setFavorite: PropTypes.func,
  }).isRequired,
  share: PropTypes.bool.isRequired,
  set: PropTypes.func.isRequired,
};

export default RenderDish;
