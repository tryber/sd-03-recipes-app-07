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

const DetailsPage = () => {
  const { params: { id }, path } = useRouteMatch();
  const { recipe, requesting } = useRequest(path, id);

  if (!requesting && recipe) {
    if (!recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;

    return (
      <div>
        <h1>Página de detalhes</h1>
        <img
          alt="food or beverage"
          src={recipe.meals[0].strMealThumb || recipe.drinks[0].strDrinkThumb}
        />
        <h2>{recipe.meals[0].strMeal || recipe.drinks[0].strDrink}</h2>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
