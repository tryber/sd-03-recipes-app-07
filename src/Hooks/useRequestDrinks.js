import axios from 'axios';
import { useState, useEffect } from 'react';
import { drinksRequests } from '../Services/requestsAPI';

const useRequestDrinks = () => {
  const [beverages, setBeverages] = useState([]);
  const [apiDrinks, setapiDrinks] = useState(true);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [ingredientsDrink, setingredientsDrink] = useState([]);

  useEffect(() => {
    drinksRequests().then(
      axios.spread((...index) => {
        const { data: { drinks } } = index[0]; setBeverages(drinks);
        const { data } = index[1]; setCategoryDrink(data.drinks.slice('', 5));
        const resultIngredients = index[2].data.drinks; setingredientsDrink(resultIngredients);

        setapiDrinks(false);
      }),
    );
  }, []);

  return {
    ingredientsDrink,
    categoryDrink,
    apiDrinks,
    beverages,
  };
};

export default useRequestDrinks;
