import axios from 'axios';

const allRequest = () => {
  const requestCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const getCategory = axios.get(requestCategory);

  const requestAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const getAreas = axios.get(requestAreas);

  const requestIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const getIngredients = axios.get(requestIngredients);

  const requestFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const getFood = axios.get(requestFood);

  axios.all([getCategory, getAreas, getIngredients, getFood])
    .then((data) => console.log(data));
};

export default allRequest;
