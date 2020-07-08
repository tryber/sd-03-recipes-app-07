import React from 'react';
import PropTypes from 'prop-types';
import '../Layout/RecipeCard.css';

const RecipeCard = ({ index, imgSrc, title, midle }) => (
  <div
    data-testid={`${index}-${midle}-card`}
    className="card"
  >
    <img
      alt="Card recipe name"
      className="card-image"
      data-testid={`${index}-card-img`}
      src={imgSrc}
    />
    <h3
      data-testid={`${index}-card-name`}
      className="card-title"
    >
      {title}
    </h3>
  </div>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  midle: PropTypes.string.isRequired,
};

export default RecipeCard;
