import axios from 'axios';
import { useEffect, useState } from 'react';
import { foodsRequests } from '../Services/requestsAPI';

const useRequestsFoods = () => {
  const [foods, setFoods] = useState([]);
  const [apiFood, setApiFoood] = useState(true);
  const [areasFood, setAreasFood] = useState([]);
  const [categoryFood, setCategoryFood] = useState([]);
  const [ingredientsFood, setIngredientsFood] = useState([]);
  // const [isFood, setIsFood] = useState(true);
  const [allFoods, setAllFood] = useState([]);

  useEffect(() => {
    foodsRequests().then(
      axios.spread((...index) => {
        const { data: { meals } } = index[0]; setFoods(meals);
        const { data } = index[1]; setCategoryFood(data.meals.slice('', 5));
        const resultIngredients = index[2].data.meals; setIngredientsFood(resultIngredients);
        setAreasFood(index[3]);
        setAllFood(index[0].data.meals);
        setApiFoood(false);
      }),
    );
  }, []);

  return {
    ingredientsFood,
    categoryFood,
    areasFood,
    allFoods,
    apiFood,
    foods,
  };
};

export default useRequestsFoods;
