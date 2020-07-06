import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const ExplorerIngredients = () => {
  const { ingredientsFood, ingredientsDrink } = useContext(recipeContext);

  const location = useLocation().pathname;
  const listIngredients = location === '/explorar/comidas/ingredientes' ? ingredientsFood : ingredientsDrink;
  const route = location === '/explorar/comidas/ingredientes' ? 'comidas' : 'bebidas';
  console.log('cade a imagemmmmmmmm', listIngredients);

  return (
    <div>
      {listIngredients.slice(0, 12).map((elem, i) => {
        const name = elem.strIngredient || elem.strIngredient1;
        const type = 'meal' || 'cocktail';
        return (
          <Link to={`/${route}/`}>
            <RecipeCard
              midle="ingredient"
              index={i}
              title={elem.strIngredient || elem.strIngredient1}
              imgSrc={`https://www.the${type}db.com/images/ingredients/${name}-Small.png`}
            />
          </Link>
        );
      })}
      <Footer />
    </div>
  );
};

export default ExplorerIngredients;
