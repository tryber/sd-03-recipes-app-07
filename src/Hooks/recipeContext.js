import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useRequestFoods from './useRequestsFoods';
import useRequestDrinks from './useRequestDrinks';

const recipeContext = createContext();

const useRecipeProvider = ({ children }) => {
  const {
    apiFood, foods, categoryFood, ingredientsFood, areasFood,
  } = useRequestFoods();

  const {
    apiDrinks, beverages, categoryDrink, ingredientsDrink,
  } = useRequestDrinks();

  const context = {
    apiFood, foods, categoryFood, ingredientsFood, areasFood, apiDrinks, beverages, categoryDrink,
    ingredientsDrink,
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

// const newMeal = () => { setIsFood(!isFood); };