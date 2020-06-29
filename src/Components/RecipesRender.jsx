import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const renderMealsOrDrinks = (item, paramState) => {
  const filteredList = paramState.length === 0
    ? item : item.filter((elem) => elem.strCategory === paramState).slice('', 12);

  return (
    <div>
      {filteredList.map((elem, i) => (
        <RecipeCard
          index={i}
          title={elem.strMeal || elem.strDrink}
          key={elem.strMeal || elem.strDrinkThumb}
          imgSrc={elem.strMealThumb || elem.strDrinkThumb}
        />
      ))}
    </div>
  );
};

const RecipesRender = () => {
  const [buttonCategory, setbuttonCategory] = useState('');
  const renderCategories = (categories) => (
    categories.map(
      (category) => (
        <button
          data-testid={`${category.strCategory}-category-filter`}
          key={`${category.strCategory}`}
          type="button"
          value={`${category.strCategory}`}
          onClick={(e) => setbuttonCategory(e.target.value)}
        >
          {category.strCategory}
        </button>
      ),
    )
  );

  const {
    foods, categoryFood, beverages, categoryDrink,
  } = useContext(recipeContext);

  if (foods) {
    return (
      <div>
        {renderCategories(categoryFood)}
        {renderMealsOrDrinks(foods, buttonCategory)}
      </div>
    );
  }
  if (beverages) {
    return (
      <div>
        {renderCategories(categoryDrink)}
        {renderMealsOrDrinks(beverages, buttonCategory)}
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
};

export default RecipesRender;
