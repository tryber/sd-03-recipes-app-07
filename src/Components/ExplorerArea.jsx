import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import RecipeCard from './RecipeCard';
import { recipeContext } from '../Hooks/recipeContext';
import { requestByAreas } from '../Services/requestsAPI';
import Header from './Header';
import Footer from './Footer';
import '../Layout/ExplorerArea.css';

const callArea = (county, setcountry) => {
  requestByAreas(county).then((data) => setcountry(data.data.meals));
};

const renderFoods = (food, paramState, renderArea) => {
  const filterIngredients = paramState.length === 0 ? food : renderArea;
  return (
    <div className="card-container">
      {filterIngredients.slice(0, 12).map((elem, i) => (
        <Link
          key={elem.strMeal}
          to={`/comidas/${elem.idMeal}`}
        >
          <RecipeCard
            midle="recipe"
            index={i}
            title={elem.strMeal}
            key={elem.strMeal}
            imgSrc={elem.strMealThumb}
          />
        </Link>
      ))}
    </div>
  );
};

const ExplorerArea = () => {
  const { areasFood, foods } = useContext(recipeContext);
  const [country, setcountry] = useState('');
  const [renderArea, setRenderArea] = useState([]);

  return (
    <div>
      <Header />
      <div>
        <select
          className="counters-select"
          data-testid="explore-by-area-dropdown"
          onChange={(e) => {
            callArea(e.target.value, setRenderArea);
            if (e.target.value === 'All') return setcountry('');
            return setcountry(e.target.value);
          }}
        >
          {areasFood.map((elem) => (
            <option
              className="counters-options"
              data-testid={`${elem.strArea}-option`}
              key={elem.strArea}
            >
              {elem.strArea}
            </option>
          ))}
          <option
            className="counters-options"
            data-testid="All-option"
          >
            All
        </option>
        </select>
        {renderFoods(foods, country, renderArea)}
      </div>
      <Footer />
    </div>
  );
};

export default ExplorerArea;
