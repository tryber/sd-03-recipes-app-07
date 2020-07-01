import React from 'react';
import RecipesRender from '../Components/RecipesRender';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const MainScreen = () => (
  <div>
    <Header />
    <h1 className="title">Tela principal de receita</h1>
    <RecipesRender />
    <Footer />
  </div>
);

export default MainScreen;
