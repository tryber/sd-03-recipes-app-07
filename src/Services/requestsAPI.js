import axios from 'axios';

const foodsRequests = async () => {
  const requestCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const getCategory = await axios.get(requestCategory);

  const requestAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const getAreas = await axios.get(requestAreas);

  const requestIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const getIngredients = await axios.get(requestIngredients);

  const requestFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const getFood = await axios.get(requestFood);

  return axios.all([getCategory, getAreas, getIngredients, getFood]);
};

const drinksRequests = async () => {
  const requestCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const getCategory = await axios.get(requestCategory);

  const requestAreas = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  const getAreas = await axios.get(requestAreas);

  const requestIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const getIngredients = await axios.get(requestIngredients);

  const requestDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const getDrinks = await axios.get(requestDrink);

  return axios.all([getCategory, getAreas, getIngredients, getDrinks]);
};

export { foodsRequests, drinksRequests };
