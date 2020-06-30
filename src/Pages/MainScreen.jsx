import React from 'react';
import RecipesRender from '../Components/RecipesRender';
import Footer from '../Components/Footer';

const MainScreen = () => (
  <div>
    <h1 className="title">Tela principal de receita</h1>
    <RecipesRender />
    <Footer />
  </div>
);

export default MainScreen;
