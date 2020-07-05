import axios from 'axios';
import { useEffect, useState } from 'react';
import { requestCategories } from '../Services/requestsAPI';

const useRequestCategories = (food, drinks, callBack) => {
  const [categories, setCategories] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

  useEffect(() => {
    requestCategories(food, drinks).then(
      axios.spread((...index) => {
        const { data } = index[0];
        setCategories(data);
        setCategoriesDrinks(index[1]);
      }),
    );
  }, [food, drinks]);

  console.log('oq ta no hooks', categories);

  return {
    categories,
    categoriesDrinks,
  };
};

export default useRequestCategories;
