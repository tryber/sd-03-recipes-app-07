import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import useRequestFoods from './useRequestsFoods';
import useRequestDrinks from './useRequestDrinks';

const recipeContext = createContext();

const useRecipeProvider = ({ children }) => {
  const [radioBtnFiltered, setRadioBtnFiltered] = useState();
  const [renderIngredients, setRenderIngredients] = useState([]);
  const {
    apiFood, foods, categoryFood, ingredientsFood, areasFood,
  } = useRequestFoods();

  const {
    apiDrinks, beverages, categoryDrink, ingredientsDrink,
  } = useRequestDrinks();

  const context = {
    foods,
    apiFood,
    areasFood,
    apiDrinks,
    beverages,
    categoryFood,
    categoryDrink,
    ingredientsFood,
    ingredientsDrink,
    radioBtnFiltered,
    renderIngredients,
    setRenderIngredients,
    setRadioBtnFilteredFun: (data) => setRadioBtnFiltered(data),
  };

  return (
    <recipeContext.Provider value={context}>
      {children}
    </recipeContext.Provider>
  );
};

useRecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useRecipeProvider, recipeContext };
