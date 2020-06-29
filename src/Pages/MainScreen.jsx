import React from 'react';
import RecipesRender from '../Components/RecipesRender';
import Header from '../Components/Header';

const MainScreen = () => (
  <div>
    <Header />
    <h1>Tela principal de receita</h1>
    <RecipesRender />
  </div>
);

export default MainScreen;
