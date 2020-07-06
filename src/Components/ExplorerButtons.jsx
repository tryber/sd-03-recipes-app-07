import React from 'react';
import { Link } from 'react-router-dom';

const ExplorerButtons = () => (
  <div>
    <p>Tela explorar</p>
    <Link to="/explorar/comidas">
      <button
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
    </Link>
    <Link to="/explorar/bebidas">
      <button
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </Link>
  </div>
);

export default ExplorerButtons;
