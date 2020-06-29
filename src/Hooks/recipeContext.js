import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import useRequestFoods from './useRequestsFoods';
import useRequestDrinks from './useRequestDrinks';

const recipeContext = createContext();

const useRecipeProvider = ({ children }) => {
  const {
    apiFood, foods, categoryFood, ingredientsFood, areasFood, allFoods,
  } = useRequestFoods();

  const {
    apiDrinks, beverages, categoryDrink, ingredientsDrink,
  } = useRequestDrinks();

  const context = {
    apiFood, foods, categoryFood, ingredientsFood, areasFood, apiDrinks, beverages, categoryDrink,
    allFoods, ingredientsDrink,
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
