import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
// import da função que faz requisição

const useRequest = (path, id) => {
  const [recipe, setRecipe] = useState({});
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    if (path.includes('comidas')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
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
              setRequesting(false);
            });
        });
    }
  }, [path, id]);

  return { recipe, requesting };
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

const renderTheDish = (dish) => {
  const ingredients = Object
    .entries(dish)
    .filter((elem) => elem[0].includes('Ingredient') && elem[1])
    .map((elem) => elem[1]);
  const measures = Object
    .entries(dish)
    .filter((elem) => elem[0].includes('Measure') && elem[1] !== ' ')
    .map((elem) => elem[1]);

  if (dish.strDrink) {
    return (
      <div>
        <img
          alt="food or beverage"
          data-testid="recipe-photo"
          style={{ width: '200px' }}
          src={dish.strDrinkThumb}
        />
        <h2 data-testid="recipe-title">{dish.strDrink}</h2>
        <h3 data-testid="recipe-category">{dish.strAlcoholic}</h3>
        {renderIngredients(ingredients, measures)}
        <p data-testid="instructions">{dish.strInstructions}</p>
      </div>
    );
  }
  console.log(dish.strYoutube)
  return (
    <div>
      <img
        alt="food or beverage"
        data-testid="recipe-photo"
        style={{ width: '200px' }}
        src={dish.strMealThumb}
      />
      <h2 data-testid="recipe-title">{dish.strMeal}</h2>
      <h3 data-testid="recipe-category">{dish.strCategory}</h3>
      {renderIngredients(ingredients, measures)}
      <p data-testid="instructions">{dish.strInstructions}</p>
      <iframe
        data-testid="video"
        src={dish.strYoutube}
        title="Video"
        frameBorder="0"
      />
    </div>
  );
};

const DetailsPage = () => {
  const { params: { id }, path } = useRouteMatch();
  const { recipe, requesting } = useRequest(path, id);

  if (!requesting && !recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;
  if (!requesting && recipe) {
    const { meals, drinks } = recipe;
    console.log(recipe);
    return renderTheDish((meals ? meals[0] : drinks[0]));
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
