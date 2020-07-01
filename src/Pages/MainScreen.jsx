import React from 'react';
import RecipesRender from '../Components/RecipesRender';
import Header from '../Components/Header';
import '../Layout/MainScreen.css';

const MainScreen = () => (
  <div className="mainscreen-container">
    <Header />
    <RecipesRender />
  </div>
);

export default MainScreen;
