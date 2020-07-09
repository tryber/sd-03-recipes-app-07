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

const doingRecipesHandler = () => {
  if (!getLocalStorage('inProgressRecipes')) {
    setLocalStorage('inProgressRecipes', { cocktails: {}, meals: {} });
  }
  return getLocalStorage('inProgressRecipes');
};

const setFood = (id, index, arr, setDoneChecks) => {
  const recipesInProgress = getLocalStorage('inProgressRecipes');
  if (arr.length === 0) {
    setLocalStorage('inProgressRecipes', {
      ...recipesInProgress,
      meals: {
        ...recipesInProgress.meals,
        [id]: [index],
      },
    });
    return setDoneChecks(setDoneChecks);
  }
  switch (arr[1].includes(index)) {
    case true:
      setLocalStorage('inProgressRecipes', {
        ...recipesInProgress,
        meals: {
          ...recipesInProgress.meals,
          [id]: [...arr[1].filter((e) => e !== index)],
        },
      });
      return setDoneChecks(setDoneChecks);
    case false:
      setLocalStorage('inProgressRecipes', {
        ...recipesInProgress,
        meals: {
          ...recipesInProgress.meals,
          [id]: [...arr[1], index],
        },
      });
      return setDoneChecks(setDoneChecks);
    default:
      break;
  }
  return setDoneChecks();
};

const setDrink = (id, index, arr, setDoneChecks) => {
  const recipesInProgress = getLocalStorage('inProgressRecipes');
  if (arr.length === 0) {
    setLocalStorage('inProgressRecipes', {
      ...recipesInProgress,
      cocktails: {
        ...recipesInProgress.cocktails,
        [id]: [index],
      },
    });
    return setDoneChecks(setDoneChecks);
  }
  switch (arr[1].includes(index)) {
    case true:
      setLocalStorage('inProgressRecipes', {
        ...recipesInProgress,
        cocktails: {
          ...recipesInProgress.cocktails,
          [id]: [...arr[1].filter((e) => e !== index)],
        },
      });
      return setDoneChecks(setDoneChecks);
    case false:
      setLocalStorage('inProgressRecipes', {
        ...recipesInProgress,
        cocktails: {
          ...recipesInProgress.cocktails,
          [id]: [...arr[1], index],
        },
      });
      return setDoneChecks(setDoneChecks);
    default:
      break;
  }
  return setDoneChecks();
};

const setDoing = (id, type, index, arr, setDoneChecks) => {
  if (type === 'comida') {
    setFood(id, index, arr, setDoneChecks);
  } else {
    setDrink(id, index, arr, setDoneChecks);
  }
};

const makeTheDish = (dish, recomendations, path, forceUpdate, setDoneChecks) => {
  const ingredients = Object.entries(dish).filter((elem) => elem[0].includes('Ingredient') && elem[1]).map((elem) => elem[1]);
  const measures = Object.entries(dish).filter((elem) => elem[0].includes('Measure') && elem[1] !== ' ').map((elem) => elem[1]);
  const doingChecks = doingRecipesHandler();
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
      recom: recomendations.slice('', 6),
      setFavorite: (...data) => setFavorite(...data, forceUpdate),
      checks: doingChecks,
      func: setDoing,
      setDoneChecks,
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
    recom: recomendations.slice('', 6),
    video: dish.strYoutube.replace('watch?v=', 'embed/'),
    setFavorite: (...data) => setFavorite(...data, forceUpdate),
    checks: doingChecks,
    func: setDoing,
    setDoneChecks,
  });
};

export default makeTheDish;
