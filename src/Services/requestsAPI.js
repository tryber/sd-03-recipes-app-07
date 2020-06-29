import axios from 'axios';

const foodsRequests = async () => {
  const requestFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const getFood = await axios.get(requestFood);

  const requestCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const getCategory = await axios.get(requestCategory);

  const requestIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const getIngredients = await axios.get(requestIngredients);

  const requestAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const getAreas = await axios.get(requestAreas);

  return axios.all([getFood, getCategory, getIngredients, getAreas]);
};

const drinksRequests = async () => {
  const requestDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const getDrinks = await axios.get(requestDrink);

  const requestCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const getCategory = await axios.get(requestCategory);

  const requestIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const getIngredients = await axios.get(requestIngredients);

  const requestAreas = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  const getAreas = await axios.get(requestAreas);

  return axios.all([getDrinks, getCategory, getIngredients, getAreas]);
};

export { foodsRequests, drinksRequests };
