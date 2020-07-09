import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../Layout/ExplorerFoodsDrinks.css';

const ExplorerFoods = () => {
  const [id, setId] = useState('');

  const explorerRandom = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((data) => setId((data.data.meals[0].idMeal)));
  };

  return (
    <div>
      <Header />
      <div className="explorer-food-btn-container-main">
        <div className="explorer-food-btn-container">
          <Link to="/explorar/comidas/ingredientes" className="buttons-container-a-food-drink">
            <button
              className="btn-explorer-button-food-drink"
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
        </button>
          </Link>
          <Link to="/explorar/comidas/area" className="buttons-container-a-food-drink">
            <button
              className="btn-explorer-button-food-drink"
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
        </button>
          </Link>
          <button
            className="btn-explorer-button-food-drink"
            type="button"
            data-testid="explore-surprise"
            onClick={explorerRandom}
          >
            Me Surpreenda!
      </button>
        </div>
      </div>
      {id !== '' && <Redirect to="/comidas/52771" />}
      <Footer />
    </div>
  );
};

export default ExplorerFoods;
