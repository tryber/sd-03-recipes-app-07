import React from 'react';
import DoneRecipeCard from '../Components/DoneRecipeCard';

const RenderDoneRecipes = ({ dishArr }) => (
  <div>
    {dishArr.length >= 1 && dishArr.map((recipe, index) => <DoneRecipeCard index={index} recipe={recipe} key={recipe.id} />)}
  </div>
);

export default RenderDoneRecipes;
