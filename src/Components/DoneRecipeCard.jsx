import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export const DoneRecipeCard = ({ recipe, index }) => (
  <div>
    <div>
      <img
        data-testid={`${index}-horizontal-image`}
        src={recipe.image}
        style={{ width: 100 }}
        alt="Recipe"
      />
    </div>
    <h4 data-testid={`${index}-horizontal-top-text`}>
      {recipe.type === 'comida' ? recipe.area + recipe.category : recipe.alcoholicOrNot}
    </h4>
    <h2 data-testid={`${index}-horizontal-name`}>{recipe.name}</h2>
    <h3 data-testid={`${index}-horizontal-done-date`}>{recipe.doneDate}</h3>
    {recipe.tags.length > 0
        && recipe.tags.map((tag) => (
          <p key={tag} data-testid={`${index}-${tag}-horizontal-tag`}>{tag}</p>
      ))}
    <button
      data-testid={`${index}-horizontal-share-btn`}
      src={shareIcon}
      type="button"
    >
      <img src={shareIcon} alt="Share" />
    </button>
  </div>
);

DoneRecipeCard.propTypes = {
  recipe: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
