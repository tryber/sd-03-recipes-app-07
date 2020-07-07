import { getLocalStorage, setLocalStorage } from '../../Services/localStorage';

const favoriteRecipesHandler = () => {
  if (!getLocalStorage('favoriteRecipes')) {
    setLocalStorage('favoriteRecipes', []);
  }
  return getLocalStorage('favoriteRecipes');
};

const setFavorite = (
  id, type, area, category, drinkCategory, alcoholicOrNot, title, thumb, forceUpdate,
) => {
  const favorites = getLocalStorage('favoriteRecipes');
  if (favorites.find((elem) => elem.id === id)) {
    setLocalStorage('favoriteRecipes', [...favorites.filter((elem) => elem.id !== id)]);
    forceUpdate(false);
  } else if (type === 'bebida') {
    setLocalStorage('favoriteRecipes', [...favorites, {
      id, type, area, category: drinkCategory, alcoholicOrNot, name: title, image: thumb,
    }]);
  } else {
    setLocalStorage('favoriteRecipes', [...favorites, {
      id, type, area, category, alcoholicOrNot, name: title, image: thumb,
    }]);
  }
  forceUpdate(true);
};

const makeTheDish = (dish, recomendations, path, forceUpdate) => {
  const ingredients = Object.entries(dish).filter((elem) => elem[0].includes('Ingredient') && elem[1]).map((elem) => elem[1]);
  const measures = Object.entries(dish).filter((elem) => elem[0].includes('Measure') && elem[1] !== ' ').map((elem) => elem[1]);
  const recom = recomendations.slice('', 6);

  const favorites = favoriteRecipesHandler();

  if (dish.strDrink) {
    return ({
      id: dish.idDrink,
      type: 'bebida',
      area: '',
      drinkCategory: dish.strCategory,
      alcoholicOrNot: dish.strAlcoholic ? 'Alcoholic' : '',
      done: false,
      path,
      favorites,
      thumb: dish.strDrinkThumb,
      title: dish.strDrink,
      category: dish.strAlcoholic,
      ingredients,
      measures,
      instructions: dish.strInstructions,
      recom,
      setFavorite: (...data) => setFavorite(...data, forceUpdate),
    });
  }
  return ({
    id: dish.idMeal,
    type: 'comida',
    area: dish.strArea,
    done: false,
    alcoholicOrNot: '',
    path,
    favorites,
    thumb: dish.strMealThumb,
    title: dish.strMeal,
    category: dish.strCategory,
    ingredients,
    measures,
    instructions: dish.strInstructions,
    recom,
    video: dish.strYoutube.replace('watch?v=', 'embed/'),
    setFavorite: (...data) => setFavorite(...data, forceUpdate),
  });
};

export default makeTheDish;
