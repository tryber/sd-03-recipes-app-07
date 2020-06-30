import React, { useContext, useState } from 'react';
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

const RecipesRender = () => {
  const {
    foods, categoryFood, beverages, categoryDrink, radioBtnFiltered
  } = useContext(recipeContext);

  const [isRadioBtnFiltered, setIsRadioBtnFiltered] = useState(false);

  let valueApi = [];

  if (radioBtnFiltered) {
    valueApi = radioBtnFiltered.meals;
  } else {
    valueApi = foods;
  }

  if (foods) {
    return (
      <div>
        {renderCategories(categoryFood, 'Beef')}
        {renderMealsOrDrinks(valueApi)}
      </div>
    );
  }
  if (beverages) {
    return (
      <div>
        {renderCategories(categoryDrink, 'bebidas')}
        {!isRadioBtnFiltered && renderMealsOrDrinks(beverages)}
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
};

export default RecipesRender;
