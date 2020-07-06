import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { recipeContext } from '../Hooks/recipeContext';
import useRequestId from '../Hooks/useRequestId';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../Layout/DetailsPage.css';

const renderTitles = (title, category) => (
  <div className="titles-container">
    <h2 data-testid="recipe-title">{title}</h2>
    <h3 data-testid="recipe-category">{category}</h3>
  </div>
);

const changeFavorite = (favorite, setFavorite, id) => {
  if (favorite.includes(id)) {
    setFavorite(favorite.filter((e) => e !== id));
  } else {
    setFavorite([...favorite, `${id}`]);
  }
};

const renderButtons = (path, favorite, setFavorite) => {
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
        onClick={() => changeFavorite(favorite, setFavorite, id)}
        src={favorite.includes(id) ? blackHeartIcon : whiteHeartIcon}
        type="button"
      >
        {favorite.includes(id)
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
  favorite, setFavorite, done, path, thumb, title,
  category, ingredients, measures, instructions, recomendations, video,
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
        {renderButtons(path, favorite, setFavorite)}
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

const makeTheDish = (dish, recomendations, path, favorite, setFavorite) => {
  const ingredients = Object
    .entries(dish)
    .filter((elem) => elem[0].includes('Ingredient') && elem[1])
    .map((elem) => elem[1]);
  const measures = Object
    .entries(dish)
    .filter((elem) => elem[0].includes('Measure') && elem[1] !== ' ')
    .map((elem) => elem[1]);
  const recom = recomendations.slice('', 6);

  if (dish.strDrink) {
    return (renderDish(
      favorite,
      setFavorite,
      false,
      path,
      dish.strDrinkThumb,
      dish.strDrink,
      dish.strAlcoholic,
      ingredients,
      measures,
      dish.strInstructions,
      recom,
    ));
  }
  return (renderDish(
    favorite,
    setFavorite,
    false,
    path,
    dish.strMealThumb,
    dish.strMeal,
    dish.strCategory,
    ingredients,
    measures,
    dish.strInstructions,
    recom,
    dish.strYoutube.replace('watch?v=', 'embed/'),
  ));
};

const mealOrDrink = (meal, drink) => { if (meal) return meal[0]; return drink[0]; };

const goodRecomen = (value) => { if (value.meals) return value.meals; return value.drinks; };

const DetailsPage = () => {
  const { favorite, setFavorite } = useContext(recipeContext);
  const { params: { id }, path, url } = useRouteMatch();
  const { recipe, recomendations, requesting } = useRequestId(path, id);

  if (!requesting && !recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;
  if (!requesting && recipe) {
    const { meals, drinks } = recipe;
    return makeTheDish(
      mealOrDrink(meals, drinks),
      goodRecomen(recomendations),
      url,
      favorite,
      setFavorite,
    );
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
