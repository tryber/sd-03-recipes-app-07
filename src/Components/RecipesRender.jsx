import React, { useContext, useState } from 'react';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const renderMealsOrDrinks = (item, paramState) => {
  const filteredList = paramState.length === 0
    ? item.slice('', 12) : item.filter((elem) => elem.strCategory === paramState);

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
    <div>
      {categories.map(
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

  const {
    foods, isFood, categoryFood, beverages, categoryDrink,
  } = useContext(recipeContext);

  if (!isFood && foods) {
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
