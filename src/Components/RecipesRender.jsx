import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';
import '../Layout/RecipesRender.css';


const renderMealsOrDrinks = (item) => (
  item.map((elem, i) => (
    <RecipeCard
      index={i}
      title={elem.strMeal || elem.strDrink}
      key={elem.strMeal || elem.strDrinkThumb}
      imgSrc={elem.strMealThumb || elem.strDrinkThumb}
    />
  ))
);

const renderCategories = (categories) => (
  categories.map(
    (category) => (
      <button
        data-testid={`${category.strCategory}-category-filter`}
        key={`${category.strCategory}`}
        type="button"
      >
        {category.strCategory}
      </button>
    ),
  )
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
  const {
    foods, categoryFood, beverages, categoryDrink, radioBtnFiltered,
  } = useContext(recipeContext);

  const location = useLocation().pathname;

  if (location === '/comidas') {
    return (
      <div>
        {renderCategories(categoryFood, 'Beef')}
        <div className="card-container">
          {renderMealsOrDrinks(returnApi(radioBtnFiltered, foods, location))}
        </div>
      </div>
    );
  } else if (location === '/bebidas') {
    return (
      <div>
        {renderCategories(categoryDrink, 'bebidas')}
        <div className="card-container">
          {renderMealsOrDrinks(returnApi(radioBtnFiltered, beverages, location))}
        </div>
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
};

export default RecipesRender;
