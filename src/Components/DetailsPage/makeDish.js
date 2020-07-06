import PropTypes from 'prop-types';
import renderDish from './renderDish';

const makeTheDish = (dish, recomendations, path, favorites) => {
  const ingredients = Object
    .entries(dish)
    .filter((elem) => elem[0].includes('Ingredient') && elem[1])
    .map((elem) => elem[1]);
  const measures = Object
    .entries(dish)
    .filter((elem) => elem[0].includes('Measure') && elem[1] !== ' ')
    .map((elem) => elem[1]);
  const recom = recomendations.slice('', 6);

  if (dish.strDrink) {
    return (renderDish(
      false,
      path,
      favorites,
      dish.strDrinkThumb,
      dish.strDrink,
      dish.strAlcoholic,
      ingredients,
      measures,
      dish.strInstructions,
      recom,
    ));
  }
  return (renderDish(
    false,
    path,
    favorites,
    dish.strMealThumb,
    dish.strMeal,
    dish.strCategory,
    ingredients,
    measures,
    dish.strInstructions,
    recom,
    dish.strYoutube.replace('watch?v=', 'embed/'),
  ));
};

// makeTheDish.propTypes = {
//   dish: PropTypes.shape(),
//   recomendations:,
//   path:,
//   favorites:,
// };

export default makeTheDish;
