import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import RecomCard from '../Components/RecipeCard';
// import da função que faz requisição

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
          <Link
            key={elem.strMeal}
            to={`/comidas/${elem.idMeal}`}
          >
            <RecomCard
              imgSrc={elem.strMealThumb}
              index={i}
              key={elem.strMealThumb}
              title={elem.strMeal}
            />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      {recom.map((elem, i) => (
        <Link
          key={elem.strDrink}
          to={`/bebidas/${elem.idDrink}`}
        >
          <RecomCard
            imgSrc={elem.strDrinkThumb}
            index={i}
            key={elem.strDrinkThumb}
            title={elem.strDrink}
          />
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

const DetailsPage = () => {
  const { params: { id }, path } = useRouteMatch();
  const { recipe, recomendations, requesting } = useRequest(path, id);

  if (!requesting && !recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;
  if (!requesting && recipe) {
    const { meals, drinks } = recipe;
    const mealOrDrink = meals ? meals[0] : drinks[0];
    const goodRecomen = recomendations.meals ? recomendations.meals : recomendations.drinks;
    return makeTheDish(
      mealOrDrink,
      goodRecomen,
    );
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
