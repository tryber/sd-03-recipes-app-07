import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const renderMealsOrDrinks = (item, paramState, route) => {
  const filteredList = paramState.length === 0
    ? item.slice('', 12) : item.filter((elem) => elem.strCategory === paramState);
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

const renderCategories = (categories, buttonCategory, setbuttonCategory) => (
  <div>
    {categories.slice('', 5).map(
      (category) => (
        <button
          type="button"
          key={`${category.strCategory}`}
          value={`${category.strCategory}`}
          onClick={(e) => {
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

  const {
    foods, categoryFood, beverages, categoryDrink, radioBtnFiltered,
  } = useContext(recipeContext);

  console.log('verificando', categoryFood);

  const location = useLocation().pathname;

  if (location === '/comidas') {
    return (
      <div>
        {renderCategories(categoryFood, buttonCategory, setbuttonCategory)}
        {renderMealsOrDrinks(returnApi(radioBtnFiltered, foods, location), buttonCategory, 'comidas')}
      </div>
    );
  } return (
    <div>
      {renderCategories(categoryDrink, buttonCategory, setbuttonCategory)}
      {renderMealsOrDrinks(returnApi(radioBtnFiltered, beverages, location), buttonCategory, 'bebidas')}
    </div>
  );
};

export default RecipesRender;
