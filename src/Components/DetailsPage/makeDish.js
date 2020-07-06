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
    return ({
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
    });
  }
  return ({
    done: false,
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
  });
};

export default makeTheDish;
