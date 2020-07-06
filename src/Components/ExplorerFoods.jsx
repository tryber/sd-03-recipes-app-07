import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer';

const ExplorerFoods = () => {
  const [id, setId] = useState('');

  const explorerRandom = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((data) => setId((data.data.meals[0].idMeal)));
  };

  return (
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={explorerRandom}
      >
        Me Surpreenda!
      </button>
      {id !== '' && <Redirect to={`/comidas/52771`} />}
      <Footer />
    </div>
  );
};

export default ExplorerFoods;
