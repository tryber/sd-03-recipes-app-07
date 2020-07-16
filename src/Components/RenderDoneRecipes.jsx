import React from 'react';
import PropTypes from 'prop-types';
import DoneRecipeCard from '../Components/DoneRecipeCard';

const RenderDoneRecipes = ({ dishArr }) => (
  <div>
    {dishArr.length >= 1
      && dishArr.map((recipe, index) => <DoneRecipeCard index={index} recipe={recipe} key={recipe.id} />)}
  </div>
);

RenderDoneRecipes.propTypes = {
  dishArr: PropTypes.string,
};

export default RenderDoneRecipes;
