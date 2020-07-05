import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const ExplorerIngredients = () => {
  const { ingredientsFood, ingredientsDrink } = useContext(recipeContext);

  const location = useLocation().pathname;
  const listIngredients = location === '/explorar/comidas/ingredientes' ? ingredientsFood : ingredientsDrink;

  return (
    <div>
      {listIngredients.slice(0, 12).map((elem, i) => (
        <Link to="/comidas">
          <RecipeCard
            midle="ingredient"
            index={i}
            title={elem.strMeal}
            imgSrc={elem.strMealThumb || elem.strDrinkThumb}
          />
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default ExplorerIngredients;
