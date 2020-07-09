import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../Layout/ExplorerFoodsDrinks.css';

const ExplorerDrinks = () => {
  const [id, setId] = useState('');

  const explorerRandom = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((data) => setId((data.data.drinks[0].idDrink)));
  };

  return (
    <div>
      <Header />
      <div className="explorer-drink-btn-container-main">
        <div className="explorer-drink-btn-container">
          <Link className="btn-explorer-a-food-drink"
            to="/explorar/bebidas/ingredientes"
          >
            <button
              className="btn-explorer-button-food-drink"
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
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
      {id !== '' && <Redirect to="/bebidas/178319" />}
      <Footer />
    </div>
  );
};

export default ExplorerDrinks;
