import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import renderDish from '../Components/DetailsPage/renderDish';
import { getLocalStorage, setLocalStorage } from '../Services';
import makeTheDish from '../Components/DetailsPage/makeDish';
import useRequestId from '../Hooks/useRequestId';
import '../Layout/DetailsPage.css';

// const changeFavorite = (favorite, id) => {
//   console.log('test', favorite, id);
// };

const mealOrDrink = (meal, drink) => { if (meal) return meal[0]; return drink[0]; };

const goodRecomen = (value) => { if (value.meals) return value.meals; return value.drinks; };

const DetailsPage = () => {
  const { params: { id }, path, url } = useRouteMatch();
  const { recipe, recomendations, requesting } = useRequestId(path, id);
  if (!getLocalStorage('favoriteRecipes')) {
    setLocalStorage('favoriteRecipes', []);
  }
  const favorites = getLocalStorage('favoriteRecipes');
  console.log(favorites);

  if (!requesting && !recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;
  if (!requesting && recipe) {
    const { meals, drinks } = recipe;
    const dish = makeTheDish(
      mealOrDrink(meals, drinks),
      goodRecomen(recomendations),
      url,
      favorites,
    );
    console.log(dish)
    return renderDish(dish);
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
