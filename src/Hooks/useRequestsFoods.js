import axios from 'axios';
import { useEffect, useState } from 'react';
import { foodsRequests } from '../Services/requestsAPI';

const useRequestsFoods = () => {
  const [foods, setFoods] = useState([]);
  const [apiFood, setApiFoood] = useState(true);
  const [areasFood, setAreasFood] = useState([]);
  const [categoryFood, setCategoryFood] = useState([]);
  const [ingredientsFood, setIngredientsFood] = useState([]);

  useEffect(() => {
    foodsRequests().then(
      axios.spread((...index) => {
        const { data } = index[1];
        const { data: { meals } } = index[0];
        const resultIngredients = index[2].data.meals;
        setFoods(meals);
        setApiFoood(false);
        setCategoryFood(data.meals);
        setAreasFood(index[3].data.meals);
        setIngredientsFood(resultIngredients);
      }),
    );
  }, []);

  return {
    ingredientsFood,
    categoryFood,
    areasFood,
    apiFood,
    foods,
  };
};

export default useRequestsFoods;
