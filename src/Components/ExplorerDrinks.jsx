import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer';

const ExplorerDrinks = () => {
  const [id, setId] = useState('');

  const explorerRandom = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((data) => setId((data.data.drinks[0].idDrink)));
  };

  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={explorerRandom}
      >
        Me Surpreenda!
      </button>
      {id !== '' && <Redirect to="/bebidas/178319" />}
      <Footer />
    </div>
  );
};

export default ExplorerDrinks;
