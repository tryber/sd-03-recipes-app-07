import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRecipeProvider as Provider } from './Hooks/recipeContext';

import {
  DetailsPage,
  Login,
  MainScreen,
  Profile,
  ExplorerScreen,
} from './Pages';

import ExplorerFoods from './Components/ExplorerFoods';
import ExplorerDrinks from './Components/ExplorerDrinks';
import ExplorerIngredients from './Components/ExplorerIngredients';
import ExplorerArea from './Components/ExplorerArea';
import NotFound from './Components/NotFound';

const App = () => (
  <Provider>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={MainScreen} />
        <Route exact path="/bebidas" component={MainScreen} />
        <Route exact path="/comidas/:id" component={DetailsPage} />
        <Route exact path="/bebidas/:id" component={DetailsPage} />
        <Route exact path="/comidas/:id/in-progess" component={Login} />
        <Route exact path="/bebidas/:id/in-progess" component={Login} />
        <Route exact path="/explorar" component={ExplorerScreen} />
        <Route exact path="/explorar/comidas" component={ExplorerFoods} />
        <Route exact path="/explorar/bebidas" component={ExplorerDrinks} />
        <Route exact path="/explorar/comidas/ingredientes" component={ExplorerIngredients} />
        <Route exact path="/explorar/bebidas/ingredientes" component={ExplorerIngredients} />
        <Route exact path="/explorar/comidas/area" component={ExplorerArea} />
        <Route exact path="/explorar/bebidas/area" component={NotFound} />
        <Route exact path="/perfil" component={Profile} />
        <Route exact path="/receitas-feitas" component={Login} />
        <Route exact path="/receitas-favoritas" component={Login} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
