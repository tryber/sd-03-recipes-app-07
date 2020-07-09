import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';
import { requestByIngredients } from '../Services/requestsAPI';
import '../Layout/ExplorerIngredients.css';

const callIngredients = (ingred, setIngred, type) => {
  requestByIngredients(ingred, type)
    .then(({ data }) => setIngred(data.meals || data.drinks));
};

const ExplorerIngredients = () => {
  const {
    ingredientsFood, ingredientsDrink, setRenderIngredients, renderIngredients,
  } = useContext(recipeContext);

  const location = useLocation().pathname;
  const listIngredients = location === '/explorar/comidas/ingredientes' ? ingredientsFood : ingredientsDrink;
  const route = location === '/explorar/comidas/ingredientes' ? 'comidas' : 'bebidas';
  const type = location === '/explorar/comidas/ingredientes' ? 'meal' : 'cocktail';

  return (
    <div>
      <Header />
      <div className="explorer-ingredients-container">
        {listIngredients.slice(0, 12).map((elem, i) => {
          const name = elem.strIngredient || elem.strIngredient1;
          return (
            <button
              className="btn-explorer-ingredients"
              type="button"
              onClick={() => {
                callIngredients(name, setRenderIngredients, type);
              }}
            >
              <RecipeCard
                midle="ingredient"
                index={i}
                title={elem.strIngredient || elem.strIngredient1}
                imgSrc={`https://www.the${type}db.com/images/ingredients/${name}-Small.png`}
              />
              {renderIngredients.length > 1 && <Redirect to={`/${route}`} />}
            </button>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ExplorerIngredients;
