import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';
import '../Layout/RecipesRender.css';

const renderMealsOrDrinks = (item, paramState) => {
  const filteredList = paramState.length === 0
    ? item.slice('', 12) : item.filter((elem) => elem.strCategory === paramState);
  return (
    <div className="card-container">
      {filteredList.map((elem, i) => (
        <Link
          key={elem.strMeal}
          to={`/comidas/${elem.idMeal}`}
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
  <div className="categories-container">
    {categories.map(
      (category) => (
        <button
          className={
            `btn-categories
            ${buttonCategory === category.strCategory ? ' active-btn' : ''}`
          }
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
      className="btn-categories-all"
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

  const location = useLocation().pathname;

  if (location === '/comidas') {
    return (
      <div>
        {renderCategories(categoryFood, buttonCategory, setbuttonCategory)}
        {renderMealsOrDrinks(returnApi(radioBtnFiltered, foods, location), buttonCategory)}
      </div >
    );
  } return (
    <div>
      {renderCategories(categoryDrink, buttonCategory, setbuttonCategory)}
      {renderMealsOrDrinks(returnApi(radioBtnFiltered, beverages, location), buttonCategory)}
    </div>
  );
};

export default RecipesRender;
