import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';


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

const returnApi = (radioBtnFiltered, foodsOrDrinks) => {
  let valueApi = [];
  if (radioBtnFiltered) {
    valueApi = radioBtnFiltered.meals;
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
        {renderMealsOrDrinks(returnApi(radioBtnFiltered, foods))}
      </div>
    );
  } else if (location === '/bebidas') {
    return (
      <div>
        {renderCategories(categoryDrink, 'bebidas')}
        {renderMealsOrDrinks(returnApi(radioBtnFiltered, beverages))}
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
};

export default RecipesRender;
