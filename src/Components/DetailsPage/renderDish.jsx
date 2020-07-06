import React from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const renderTitles = (title, category) => (
  <div className="titles-container">
    <h2 data-testid="recipe-title">{title}</h2>
    <h3 data-testid="recipe-category">{category}</h3>
  </div>
);

const renderButtons = (path, favorites, favoriteFunc) => {
  const urlPath = `localhost:3000${path}`;
  const id = path.slice(-5);
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
        onClick={() => favoriteFunc(id)}
        src={favorites.includes(id) ? blackHeartIcon : whiteHeartIcon}
        type="button"
      >
        {favorites.includes(id)
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

const startBtn = (doing) => (
  <div>
    <Link to="/comidas/52977/in-progress">
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

const renderDish = (
  done, path, favorites, thumb, title, category,
  ingredients, measures, instructions, recomendations, video,
) => (
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
        {renderButtons(path, favorites)}
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
      {renderRecomendations(recomendations)}
    </div>
    {!done && startBtn()}
  </div>
);

export default renderDish;
