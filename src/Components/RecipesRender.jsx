import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const renderMealsOrDrinks = (item) => (
  item.map((elem, i) => (
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

const RecipesRender = () => {
  const {
    foods, categoryFood, beverages, categoryDrink,
  } = useContext(recipeContext);

  console.log(categoryFood);

  if (foods) {
    return (
      <div>
        {renderCategories(categoryFood, 'Beef')}
        {renderMealsOrDrinks(foods)}
      </div>
    );
  }
  if (beverages) {
    return (
      <div>
        {renderCategories(categoryDrink, 'bebidas')}
        {renderMealsOrDrinks(beverages)}
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
};

export default RecipesRender;
