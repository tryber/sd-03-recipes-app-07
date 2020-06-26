import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const recipeContext = createContext();

// const fazRequisição = ( funcDeRequisição ) => {
// const [receitas, setReceitas] = useState([]);
// useEffect(() => {}, [funcDeRequisição]);
// };

const recipeProvider = ({ children }) => {
  // const receitas = fazRequisiçãoDasReceitas();
  const context = {};

  return (
    <recipeContext.Provider value={context}>
      {children}
    </recipeContext.Provider>
  );
};

recipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { recipeProvider, recipeContext };
