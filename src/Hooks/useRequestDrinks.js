import { useState, useEffect } from 'react';
import axios from 'axios';
import { drinksRequests } from '../Services/requestsAPI';

const useRequestDrinks = () => {
  const [beverages, setBeverages] = useState([]);
  const [apiDrinks, setapiDrinks] = useState(true);
  const [ingredientsDrink, setingredientsDrink] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  useEffect(() => {
    drinksRequests().then(
      axios.spread((...index) => {
        const { data: { drinks } } = index[0]; setBeverages(drinks.slice('', 12));
        const { data } = index[1]; setCategoryDrink(data.drinks.slice('', 5));
        const resultIngredients = index[2].data.drinks; setingredientsDrink(resultIngredients);
        setapiDrinks(false);
      }),
    );
  }, []);

  return {
    beverages,
    apiDrinks,
    categoryDrink,
    ingredientsDrink,
  };
};

export default useRequestDrinks;
