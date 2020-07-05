import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const ExplorerFoods = () => (
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
    <Link to="/comidas/52771">
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

export default ExplorerFoods;
