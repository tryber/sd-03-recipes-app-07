import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import makeTheDish from '../Components/DetailsPage/dishHelper';
import RenderDish from '../Components/DetailsPage/RenderDish';
import useRequestId from '../Hooks/useRequestId';
import '../Layout/DetailsPage.css';

const mealOrDrink = (meal, drink) => { if (meal) return meal[0]; return drink[0]; };

const goodRecomen = (value) => { if (value.meals) return value.meals; return value.drinks; };

const DetailsPage = () => {
  const forceUpdate = useState('')[1];
  const { params: { id }, path, url } = useRouteMatch();
  const { recipe, recomendations, requesting } = useRequestId(path, id);

  if (!requesting && !recipe.meals && !recipe.drinks) return <h1>Receita não encontrada</h1>;
  if (!requesting && recipe) {
    const { meals, drinks } = recipe;
    const dish = makeTheDish(
      mealOrDrink(meals, drinks),
      goodRecomen(recomendations),
      url,
      forceUpdate,
      forceUpdate,
    );
    return RenderDish(dish);
  }
  return <h1>Loading...</h1>;
};

export default DetailsPage;
