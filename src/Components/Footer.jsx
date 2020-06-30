import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../Layout/Footer.css';

const DrinksToFooter = () => (
  <Link
    to="/bebidas"
  >
    <div
      // data-testid="drinks-bottom-btn"
      // className="Footer_icon"
    >
      <img className="Footer_icon" data-testid="drinks-bottom-btn" src={DrinkIcon} alt="Drinks redirect" />
    </div>
  </Link>
);

const ExploreToFooter = () => (
  <Link
    to="/explorar"
  >
    <div
      // data-testid="explore-bottom-btn"
      // className="Footer_icon"
    >
      <img className="Footer_icon" data-testid="explore-bottom-btn" src={ExploreIcon} alt="Explore redirect" />
    </div>
  </Link>
);

const MealsToFooter = () => (
  <Link
    to="/comidas"
  >
    <div
      // data-testid="food-bottom-btn"
      // className="Footer_icon"
      // src="Footer_icon"
    >
      <img className="Footer_icon" data-testid="food-bottom-btn" src={MealIcon} alt="Meals redirect" />
    </div>
  </Link>
);

const Footer = () => {
  const location = useLocation();
  console.log('location aqui', location);
  return (
    <div
      data-testid="footer"
      className="Footer_all"
    >
      {DrinksToFooter()}
      {ExploreToFooter()}
      {MealsToFooter()}
    </div>
  );
};

export default Footer;
