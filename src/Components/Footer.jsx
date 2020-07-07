import React from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../Layout/Footer.css';

const DrinksToFooter = () => (
  <Link
    to="/bebidas"
  >
    <img
      className="Footer_icon"
      data-testid="drinks-bottom-btn"
      src={DrinkIcon}
      alt="Drinks redirect"
    />
  </Link>
);

const ExploreToFooter = () => (
  <Link
    to="/explorar"
  >
    <img
      className="Footer_icon"
      data-testid="explore-bottom-btn"
      src={ExploreIcon}
      alt="Explore redirect"
    />
  </Link>
);

const MealsToFooter = () => (
  <Link
    to="/comidas"
  >
    <img
      className="Footer_icon"
      data-testid="food-bottom-btn"
      src={MealIcon}
      alt="Meals redirect"
    />
  </Link>
);

const Footer = () => {
  const location = useLocation();
  console.log('location aqui', location);
  return (
    <footer
      data-testid="footer"
      className="Footer_all"
    >
      {DrinksToFooter()}
      {ExploreToFooter()}
      {MealsToFooter()}
    </footer>
  );

export default Footer;
