import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const RecipesRender = () => {
  const {
    beverages, foods, requesting, isFood,
  } = useContext(recipeContext);

  if (!requesting && isFood) {
    const { data: { meals } } = foods[3];
    return (
      <div>
        {meals.map((meal, i) => (
          <RecipeCard
            key={meal.strMeal}
            index={i}
            imgSrc={meal.strMealThumb}
            title={meal.strMeal}
          />
        ))}
      </div>
    );
  }
  if (!requesting && isFood) {
    const { data: { drinks } } = beverages[3];
    return (
      <div>
        {drinks.map((Drink, i) => (
          <RecipeCard
            key={Drink.strDrink}
            index={i}
            imgSrc={Drink.strDrinkThumb}
            title={Drink.strDrink}
          />
        ))}
      </div>
    );
  }
  return (
    <p>Loading</p>
  );
};

export default RecipesRender;
