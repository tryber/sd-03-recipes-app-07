import axios from 'axios';

const foodsRequests = async () => {
  const requestFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const getFood = await axios.get(requestFood);

  const requestCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const getCategory = await axios.get(requestCategory);

  const requestIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
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

const requestRadioButtons = (radioSelected, inputValue, location) => {
  let typeRecipe = '';
  if (location.includes('comidas')) {
    typeRecipe = 'themealdb';
  } else if (location.includes('bebidas')) {
    typeRecipe = 'thecocktaildb';
  }
  switch (radioSelected) {
    case 'ingredients':
      return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/filter.php?i=${inputValue}`)
        .then((res) => res.json());
    case 'name':
      return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then((res) => res.json());
    case 'letterFirst':
      return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/search.php?f=${inputValue}`)
        .then((res) => res.json());
    default:
      return '';
  }
};

const requestCategoriesFood = async (food) => {
  const urlCategoryFood = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;
  const categoryFood = await axios.get(urlCategoryFood);
  return categoryFood;
};

const requestCategoriesDrinks = async (drink) => {
  const urlCategoryDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`;
  const categoryDrink = await axios.get(urlCategoryDrink);
  return categoryDrink;
};

export {
  foodsRequests, drinksRequests, requestRadioButtons, requestCategoriesFood,
  requestCategoriesDrinks,
};
