import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ index, imgSrc, title }) => (
  <div
    data-testid={`${index}-recipe-card`}
  >
    <img
      alt="Card recipe name"
      data-testid={`${index}-card-img`}
      src={imgSrc}
    />
    <h3
      data-testid={`${index}-card-name`}
    >
      {title}
    </h3>
  </div>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
