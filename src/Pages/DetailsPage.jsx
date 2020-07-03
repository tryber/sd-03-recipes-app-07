import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import '../Layout/DetailsPage.css';

const useRequest = (path, id) => {
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    if (path.includes('comidas')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
            });
        });
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecomendations(json);
              setRequesting(false);
            });
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
            });
        });
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecomendations(json);
              setRequesting(false);
            });
        });
    }
  }, [path, id]);

  return { recipe, recomendations, requesting };
};

const renderIngredients = (ingredients, measures) => (
  <div className="ingredients-container">
    <h3>Ingredientes</h3>
    {ingredients.map((elem, i) => (
      <p
        data-testid={`${i}-ingredient-name-and-measure`}
        key={elem}
      >
        {`-${elem}-${measures[i]}`}
      </p>
    ))}
  </div>
);

const renderRecomendations = (recom) => {
  if (!recom[0].strDrink) {
    return (
      <div className="recom-container">
        {recom.map((elem, i) => (
          <Link key={elem.strMeal} to={`/comidas/${elem.idMeal}`}>
            <div data-testid={`${i}-recomendation-card`} className="card">
              <h3 data-testid={`${i}-recomendation-title`} className="title-c">{elem.strMeal}</h3>
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
            <h3 data-testid={`${i}-recomendation-title`} className="title-c">{elem.strDrink}</h3>
            <img alt="Card recipe name" className="cardImage" src={elem.strDrinkThumb} />
          </div>
        </Link>
      ))}
    </div>
  );
};

const renderButtons = () => (
  <div className="buttons-container">
    <button>Comp</button>
    <button>Curtir</button>
  </div>
);

const renderTitles = (title, category) => (
  <div className="titles-container">
    <h2 data-testid="recipe-title">{title}</h2>
    <h3 data-testid="recipe-category">{category}</h3>
  </div>
);

const renderIntructions = (instructions) => (
  <div className="instructions-container">
    <h3>Instruções</h3>
    <p data-testid="instructions">{instructions}</p>
  </div>
);

const renderDish = (
  thumb, title, category, ingredients, measures, instructions, recomendations, video) => (
    <div>
      <img
        alt="food or beverage"
        data-testid="recipe-photo"
        src={thumb}
        className="recipe-img"
      />
      <div className="recipe-container">
        <div className="recipe-header">
          {renderTitles(title, category)}
          {renderButtons()}
        </div>
        {renderIngredients(ingredients, measures)}
        {renderIntructions(instructions)}
        {video && (
          <iframe
            className="intruction-video"
            data-testid="video"
            src={video}
            title="Video"
            frameBorder="0"
          />
        )}
        {renderRecomendations(recomendations)}
      </div>
    </div>
  );

const makeTheDish = (dish, recomendations) => {
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
  const { params: { id }, path } = useRouteMatch();
  const { recipe, recomendations, requesting } = useRequest(path, id);

  if (!requesting && !recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;
  if (!requesting && recipe) {
    const { meals, drinks } = recipe;
    return makeTheDish(
      mealOrDrink(meals, drinks),
      goodRecomen(recomendations),
    );
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
