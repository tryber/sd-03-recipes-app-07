import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';
import { requestCategoriesFood, requestCategoriesDrinks } from '../Services/requestsAPI';

const renderMealsOrDrinks = (item, paramState, route, categories) => {
  const filteredList = paramState.length === 0 ? item.slice('', 12) : categories.slice(0, 12);
  console.log('william', categories);
  return (
    <div>
      {filteredList.map((elem, i) => (
        <Link
          key={elem.strMeal || elem.strDrink}
          to={`/${route}/${elem.idMeal || elem.idDrink}`}
        >
          <RecipeCard
            index={i}
            title={elem.strMeal || elem.strDrink}
            key={elem.strMeal || elem.strDrinkThumb}
            imgSrc={elem.strMealThumb || elem.strDrinkThumb}
          />
        </Link>
      ))}
    </div>
  );
};

const callCategory = (event, setButton, location) => {
  if (location === '/comidas') {
    return (
      requestCategoriesFood(event).then((data) => setButton(data.data.meals))
    );
  }
  return (
    requestCategoriesDrinks(event).then((data) => setButton(data.data.drinks))
  );
};

const renderCategories = (categories, buttonCategory, setbuttonCategory, location, setAPI) => (
  <div>
    {categories.slice('', 5).map(
      (category) => (
        <button
          type="button"
          key={`${category.strCategory}`}
          value={`${category.strCategory}`}
          onClick={(e) => {
            callCategory(e.target.value, setAPI, location);
            if (e.target.value === buttonCategory) return setbuttonCategory('');
            return setbuttonCategory(e.target.value);
          }}
          data-testid={`${category.strCategory}-category-filter`}
        >
          {category.strCategory}
        </button>
      ),
    )}
    <button
      data-testid="All-category-filter"
      onClick={() => setbuttonCategory('')}
      type="button"
    >
      All
    </button>
  </div>
);

const returnApi = (radioBtnFiltered, foodsOrDrinks, location) => {
  let valueApi = [];
  if (radioBtnFiltered && location === '/comidas') {
    valueApi = radioBtnFiltered.meals;
  } else if (radioBtnFiltered && location === '/bebidas') {
    valueApi = radioBtnFiltered.drinks;
  } else {
    valueApi = foodsOrDrinks;
  }
  return valueApi;
};

const RecipesRender = () => {
  const [buttonCategory, setbuttonCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const {
    foods, categoryFood, beverages, categoryDrink, radioBtnFiltered,
  } = useContext(recipeContext);

  // console.log('agora chegou requisicao', buttonCategory);
  console.log('set requisicao', categories);

  const location = useLocation().pathname;

  if (location === '/comidas') {
    return (
      <div>
        {renderCategories(categoryFood, buttonCategory, setbuttonCategory, location, setCategories)}
        {renderMealsOrDrinks(returnApi(radioBtnFiltered, foods, location), buttonCategory, 'comidas', categories)}
      </div>
    );
  } return (
    <div>
      {renderCategories(categoryDrink, buttonCategory, setbuttonCategory, location, setCategories)}
      {renderMealsOrDrinks(returnApi(radioBtnFiltered, beverages, location), buttonCategory, 'bebidas', categories)}
    </div>
  );
};

export default RecipesRender;
