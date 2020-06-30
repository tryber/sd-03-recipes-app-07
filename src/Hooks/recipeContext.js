import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import useRequestFoods from './useRequestsFoods';
import useRequestDrinks from './useRequestDrinks';

const recipeContext = createContext();

const useRecipeProvider = ({ children }) => {
  const [radioBtnFiltered, setRadioBtnFiltered] = useState({});
  const {
    apiFood, foods, categoryFood, ingredientsFood, areasFood, allFoods,
  } = useRequestFoods();
  const {
    apiDrinks, beverages, categoryDrink, ingredientsDrink,
  } = useRequestDrinks();
  const context = {
    apiFood,
    foods,
    categoryFood,
    ingredientsFood,
    areasFood,
    apiDrinks,
    beverages,
    categoryDrink,
    allFoods,
    ingredientsDrink,
    radioBtnFiltered,
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

// const newMeal = () => { setIsFood(!isFood); };
