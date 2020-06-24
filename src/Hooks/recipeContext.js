import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const recipeContext = createContext();

const recipeProvider = ({ children }) => {
  const context = {};

  return (
    <recipeContext.Provider value={context}>
      {children}
    </recipeContext.Provider>
  );
};

recipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { recipeProvider, recipeContext };
