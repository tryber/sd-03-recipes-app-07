import React, { useContext } from 'react';
import { recipeContext } from '../Hooks/recipeContext';

// const filterIngredients = (array) => {
//   return array.filter((elem) => elem.strIngredient);
// };

const CategoryFilter = () => {
  const { ingredientsFood, ingredientsDrink } = useContext(recipeContext);

  return (
    <div>
      olá
    </div>
  );
};

export default CategoryFilter;
