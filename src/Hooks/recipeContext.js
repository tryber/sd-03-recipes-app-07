import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useRequestFoods from './useRequestsFoods';
import useRequestDrinks from './useRequestDrinks';

const recipeContext = createContext();

const useRecipeProvider = ({ children }) => {
  const {
    foods,
    requesting,
  } = useRequestFoods();

  const {
    beverages,
  } = useRequestDrinks();
  // const newMeal = () => { setIsFood(!isFood); };

  const context = {
    foods,
    beverages,
    requesting,
    // newMeal,
  };

  console.log('aqui', context);

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
