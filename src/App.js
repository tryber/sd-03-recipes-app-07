import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRecipeProvider as Provider } from './Hooks/recipeContext';
import {
  DetailsPage,
  Login,
  MainScreen,
} from './Pages';

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
        <Route exact path="/explorar" component={MainScreen} />
        <Route exact path="/explorar/comidas" component={Login} />
        <Route exact path="/explorar/bebidas" component={Login} />
        <Route exact path="/explorar/comidas/ingredientes" component={Login} />
        <Route exact path="/explorar/bebidas/ingredientes" component={Login} />
        <Route exact path="/explorar/comidas/area" component={Login} />
        <Route exact path="/perfil" component={Login} />
        <Route exact path="/receitas-feitas" component={Login} />
        <Route exact path="/receitas-favoritas" component={Login} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
