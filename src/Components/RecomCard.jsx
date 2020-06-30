import React from 'react';
import PropTypes from 'prop-types';
import '../Layout/RecipeCard.css';

const RecipeCard = ({ index, imgSrc, title }) => (
  <div
    data-testid={`${index}-recomendation-card`}
    className="card"
  >
    <h3
      data-testid={`${index}-recomendation-title`}
    >
      {title}
    </h3>
    <img
      alt="Card recipe name"
      className="cardImage"
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
