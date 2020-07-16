import { getLocalStorage, setLocalStorage } from './localStorage';

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
    forceUpdate(forceUpdate);
  } else if (type === 'bebida') {
    setLocalStorage('favoriteRecipes', [...favorites, {
      id, type, area, category: drinkCategory, alcoholicOrNot, name: title, image: thumb,
    }]);
    forceUpdate(forceUpdate);
  } else {
    setLocalStorage('favoriteRecipes', [...favorites, {
      id, type, area, category, alcoholicOrNot, name: title, image: thumb,
    }]);
    forceUpdate(forceUpdate);
  }
  forceUpdate();
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

const setup = (dish) => {
  const ingredients = Object.entries(dish).filter((elem) => elem[0].includes('Ingredient') && elem[1]).map((elem) => elem[1]);
  const measures = Object.entries(dish).filter((elem) => elem[0].includes('Measure') && elem[1] !== ' ').map((elem) => elem[1]);
  const doingChecks = doingRecipesHandler();
  const favorites = favoriteRecipesHandler();
  return { ingredients, measures, doingChecks, favorites };
};

const makeTheDish = (dish, recomendations, path, forceUpdate) => {
  const { ingredients, measures, doingChecks, favorites } = setup(dish);
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
      func: [setDoing, forceUpdate],
    });
  }
  return ({
    id: dish.idMeal,
    type: 'comida',
    area: dish.strArea,
    done: false,
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
    func: [setDoing, forceUpdate],
  });
};

const setDoneMeal = (meal, date) => {
  const { idMeal, strMealThumb, strMeal, strCategory, strArea, strTags } = meal;
  const tags = strTags.split(',').slice(0, 2);
  return {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: date,
    tags,
  };
};

const setDoneDrink = (drink, date) => {
  const { idDrink, strCategory, strDrinkThumb, strDrink, strAlcoholic } = drink;
  return {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: date,
    tags: [],
  };
};

const doneRecipesHandler = async (id, type, date) => {
  const isMeal = type === 'comida' ? 'meal' : 'cocktail';
  const req = await fetch(`https://www.the${isMeal}db.com/api/json/v1/1/lookup.php?i=${id}`);
  const res = await req.json();
  const dish = type === 'comida' ? setDoneMeal(res.meals[0], date) : setDoneDrink(res.drinks[0], date);
  console.log(dish);
  // remove a receita do localstorage doing
  // salvar dados no local storage em feitas
};

export { doneRecipesHandler, makeTheDish };
