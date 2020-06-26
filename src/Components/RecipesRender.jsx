import React, { useContext, useState } from 'react';
import { recipeContext } from '../Hooks/recipeContext';

const RecipesRender = () => {
  const { recipes } = useContext(recipeContext);
  const [foods, setFoods] = useState();

  return (
    <div>ok</div>
  );
};

export default RecipesRender;
