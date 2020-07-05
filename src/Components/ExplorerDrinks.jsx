import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const ExplorerDrinks = () => (
  <div>
    <Link to="/explorar/bebidas/ingredientes">
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
    </Link>
    <Link to="/bebidas/178319">
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </Link>
    <Footer />
  </div>
);

export default ExplorerDrinks;
