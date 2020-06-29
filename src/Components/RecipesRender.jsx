import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';

const renderMealsOrDrinks = (item) => (
  item.map((elem, i) => (
    <RecipeCard
      index={i}
      title={elem.strMeal || elem.strDrink}
      key={elem.strMeal || elem.strDrinkThumb}
      imgSrc={elem.strMealThumb || elem.strDrinkThumb}
    />
  ))
);

// const selectCategory = (array, typeFood) => array.filter((el) => el.strCategory === typeFood);

const renderCategories = (categories) => (
  categories.map(
    (category) => (
      <button
        data-testid={`${category.strCategory}-category-filter`}
        key={`${category.strCategory}`}
        type="button"
        // onClick={() => selectCategory(categories, typeFood)}
      >
        {category.strCategory}
      </button>
    ),
  )
);

// const redirectToDetails = (typeFood) => {
//   typeFood.map((type, item) => (
//     <Link to={`/${item}/${type.strCategory}`}>
//       <div>
//         <h1>{type}</h1>
//         <p>{type}</p>
//       </div>
//     </Link>
//   ));
// };

const RecipesRender = () => {
  const {
    foods, categoryFood, beverages, categoryDrink,
  } = useContext(recipeContext);

  console.log(categoryFood);

  if (foods) {
    return (
      <div>
        {renderCategories(categoryFood, 'Beef')}
        {renderMealsOrDrinks(foods)}
      </div>
    );
  }
  if (beverages) {
    return (
      <div>
        {renderCategories(categoryDrink, 'bebidas')}
        {renderMealsOrDrinks(beverages)}
      </div>
    );
  }
  return (
    // <>
    //   {
    //   foods ? renderCategories(categoryFood, 'comidas') && renderMealsOrDrinks(foods)
    //     : <p>Loading...</p>
    //   }
    // </>
    <p>carregando</p>
  );
};

export default RecipesRender;
