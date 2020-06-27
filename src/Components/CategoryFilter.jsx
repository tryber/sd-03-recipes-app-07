import React, { useContext } from 'react';
import { recipeContext } from '../Hooks/recipeContext';

const filterIngredients = (array, typeFood) => array.filter((el) => el.strCategory === typeFood);

const CategoryFilter = () => {
  const { ingredientsFood, ingredientsDrink, allFoods, foods,
  } = useContext(recipeContext);

  console.log('categories', allFoods);
  console.log('categorieasdasdasdasd', foods);
  return (
    <div>
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
