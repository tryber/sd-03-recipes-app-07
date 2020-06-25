import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={Login} />
      <Route exact path="/bebidas" component={Login} />
      <Route exact path="/comidas/id:" component={Login} />
      <Route exact path="/bebidas/id:" component={Login} />
      <Route exact path="/comidas/id:/in-progess" component={Login} />
      <Route exact path="/bebidas/id:/in-progess" component={Login} />
      <Route exact path="/explorar" component={Login} />
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
);

export default App;
