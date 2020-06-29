import React, { useContext } from 'react';
import { recipeContext } from '../Hooks/recipeContext';

const filterIngredients = (array, typeFood) => array.filter((el) => el.strCategory === typeFood);

const CategoryFilter = () => {
  const {
    ingredientsFood, ingredientsDrink, allFoods, foods,
  } = useContext(recipeContext);

  console.log(ingredientsFood, ingredientsDrink, allFoods);

  return (
    <div className="categoryCard">
      {filterIngredients(foods, 'Beef')
        .map((e) => (
          <div>
            <li>{e.strCategory}</li>
            <li>{e.strMeal}</li>
            <li>{e.strInstructions}</li>
          </div>
        ))}
    </div>
  );
};

export default CategoryFilter;
