import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const renderMeals = (meals) => (
  meals.slice('', 12).map((meal, i) => (
    <Link
      key={meal.strMeal}
      to={{
        pathname: `/comidas/${meal.idMeal}`,
        state: { ...meal },
      }}
    >
      <RecipeCard
        index={i}
        imgSrc={meal.strMealThumb}
        title={meal.strMeal}
      />
    </Link>
  ))
);

const renderDrinks = (drinks) => (
  drinks.slice('', 12).map((drink, i) => (
    <RecipeCard
      key={drink.strDrink}
      index={i}
      imgSrc={drink.strDrinkThumb}
      title={drink.strDrink}
    />
  ))
);

// Transformar em componente
const renderCategories = (categories) => (
  categories.slice('', 5).map(
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
    beverages, foods, requesting, isFood,
  } = useContext(recipeContext);

  if (!requesting && isFood) {
    const { data: { meals } } = foods[3];
    const { data: { meals: categories } } = foods[0];
    return (
      <div>
        {renderCategories(categories)}
        {renderMeals(meals)}
      </div>
    );
  }
  if (!requesting && !isFood) {
    const { data: { drinks } } = beverages[3];
    const { data: { drinks: categories } } = beverages[0];
    return (
      <div>
        {renderCategories(categories)}
        {renderDrinks(drinks)}
      </div>
    );
  }
  return (
    <p>Loading</p>
  );
};

export default RecipesRender;
