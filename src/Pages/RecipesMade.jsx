import React from 'react';
import RenderDoneRecipes from '../Components/RenderDoneRecipes';
import { doneRecipesLS } from '../Services/dishHelper';

const RecipesMade = () => {
  const recipes = doneRecipesLS();
  return (
    <div>
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>
      <RenderDoneRecipes dishArr={recipes} />
    </div>
  );
};

export default RecipesMade;
