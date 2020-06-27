import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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

const renderCategories = (categories, item) => (
  categories.map(
    (category) => (
      <Link to={`/${item}/${category.strCategory}`}>
        <button
          data-testid={`${category.strCategory}-category-filter`}
          key={`${category.strCategory}`}
          type="button"
        >
          {category.strCategory}
        </button>
      </Link>
    ),
  )
);

const RecipesRender = () => {
  const {
    foods, categoryFood, beverages, categoryDrink,
  } = useContext(recipeContext);

  // console.log('em categorias', categoryFood);

  if (foods) {
    return (
      <div>
        {renderCategories(categoryFood, 'comidas')}
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
    // <>
    //   {
    //   foods ? renderCategories(categoryFood, 'comidas') && renderMealsOrDrinks(foods)
    //     : <p>Loading...</p>
    //   }
    // </>
    <p>carregando</p>
  );
};

export default RecipesRender;
