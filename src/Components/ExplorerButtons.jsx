import React from 'react';
import { Link } from 'react-router-dom';
import '../Layout/ExplorerButtons.css';

const ExplorerButtons = () => (
  <div className="buttons-container-main">
    <div className="buttons-container-explorer">
      <Link to="/explorar/comidas" className="btn-explorer-a">
        <button
          className="btn-explorer-button"
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
      </button>
      </Link>
      <Link to="/explorar/bebidas" className="btn-explorer-a">
        <button
          className="btn-explorer-button"
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
      </button>
      </Link>
    </div>
  </div>
);

export default ExplorerButtons;
