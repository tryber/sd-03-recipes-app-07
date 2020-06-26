import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodsRequests, drinksRequests } from '../Services/requestsAPI';

const recipeContext = createContext();

const useRecipeProvider = ({ children }) => {
  const [requesting, setRequesting] = useState(true);
  const [foods, setFoods] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    foodsRequests().then((data) => {
      setFoods(data);
      drinksRequests().then((datas) => {
        setBeverages(datas);
        setRequesting(false);
      });
    });
  }, []);

  const context = {
    foods,
    beverages,
    requesting,
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
