import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../Layout/DetailsPage.css';

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
    <div className="buttons-container-details">
      <button
        className="share-btn"
        data-testid="share-btn"
        onClick={() => { navigator.clipboard.writeText(urlPath); alert('Link copiado!'); }}
        src={shareIcon}
        type="button"
      >
        <img src={shareIcon} alt="Share" />
      </button>
      <button
        className="favorite-btn"
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

const startBtn = (doing, path) => (
  <div>
    <Link to={`${path}/in-progress`}>
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        {doing
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </button>
    </Link>
  </div>
);

const RenderDish = ({
  id, type, area, drinkCategory, alcoholicOrNot, done, path, favorites, thumb, title, category,
  ingredients, measures, instructions, recom, video, setFavorite,
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
    {!done && startBtn(done, path)}
  </div>
  );

RenderDish.defaultProps = {
  video: '',
};

RenderDish.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  drinkCategory: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  thumb: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  instructions: PropTypes.string.isRequired,
  recom: PropTypes.arrayOf(PropTypes.object).isRequired,
  video: PropTypes.string,
  setFavorite: PropTypes.func.isRequired,
};

export default RenderDish;
