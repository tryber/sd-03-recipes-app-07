import React from 'react';
import RecipeMadeCard from './RecipeCard';

const BtnFiltersFoodDrinks = () => (
  <div>
    <button data-testid="filter-by-all-btn">All</button>
    <button data-testid="filter-by-food-btn">Food</button>
    <button data-testid="filter-by-drink-btn" >Drinks</button>
  </div>
);

const RecipesMadeRender = () => (
  <div>
    <RecipeMadeCard />
  </div>
);

export default RecipesMadeRender;
