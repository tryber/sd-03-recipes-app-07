import React from 'react';
import PropTypes from 'prop-types';
import '../Layout/RecipeCard.css';

const RecipeCard = ({ index, imgSrc, title }) => (
  <div
    data-testid={`${index}-recipe-card`}
  >
    <h3
      data-testid={`${index}-card-name`}
    >
      {title}
    </h3>
    <img
      alt="Card recipe name"
      className="cardImage"
      data-testid={`${index}-card-img`}
      src={imgSrc}
    />
  </div>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
