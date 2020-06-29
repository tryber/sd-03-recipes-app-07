import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import da função que faz requisição

const DetailsPage = (props) => {
  const [recipe, setRecipe] = useState({});
  const [requesting, setRequesting] = useState(true);
  const { match: { params: { id }, path } } = props;

  useEffect(() => {
    if (path.includes('comidas')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
              setRequesting(false);
            });
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
              setRequesting(false);
            });
        });
    }
  }, []);

  if (!requesting && recipe) {
    console.log(recipe);
    return (
      <div>
        <h1>Página de detalhes</h1>
        <img
          alt="food or beverage"
          src={recipe.meals[0].strMealThumb || recipe.drinks[0].strDrinkThumb}
        />
        <h2>{recipe.meals[0].strMeal || recipe.drinks[0].strDrink}</h2>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

DetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }).isRequired,
};

export default DetailsPage;
