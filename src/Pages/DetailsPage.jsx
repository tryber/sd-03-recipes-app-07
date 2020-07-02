import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import useRequestId from '../Hooks/useRequestId';

const renderIngredients = (ingredients, measures) => (
  <div>
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
      <div>
        {recom.map((elem, i) => (
          <Link key={elem.strMeal} to={`/comidas/${elem.idMeal}`}>
            <div data-testid={`${i}-recomendation-card`} className="card">
              <h3 data-testid={`${i}-recomendation-title`}>{elem.strMeal}</h3>
              <img alt="Card recipe name" className="cardImage" src={elem.strMealThumb} />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      {recom.map((elem, i) => (
        <Link key={elem.strDrink} to={`/bebidas/${elem.idDrink}`}>
          <div data-testid={`${i}-recomendation-card`} className="card">
            <h3 data-testid={`${i}-recomendation-title`}>{elem.strDrink}</h3>
            <img alt="Card recipe name" className="cardImage" src={elem.strDrinkThumb} />
          </div>
        </Link>
      ))}
    </div>
  );
};

const renderDish = (
  thumb, title, category, ingredients, measures, instructions, recomendations, video,
) => (
  <div>
    <img
      alt="food or beverage"
      data-testid="recipe-photo"
      style={{ width: '200px' }}
      src={thumb}
    />
    <h2 data-testid="recipe-title">{title}</h2>
    <h3 data-testid="recipe-category">{category}</h3>
    {renderIngredients(ingredients, measures)}
    <p data-testid="instructions">{instructions}</p>
    {video && (
      <iframe
        data-testid="video"
        src={video}
        title="Video"
        frameBorder="0"
      />
    )}
    {renderRecomendations(recomendations)}
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
  const { recipe, recomendations, requesting } = useRequestId(path, id);

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
