import React from 'react';
import RecipesRender from '../Components/RecipesRender';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../Layout/MainScreen.css';

const MainScreen = () => (
  <div className="mainscreen-container">
    <Header />
    <RecipesRender />
    <Footer />
  </div>
);

export default MainScreen;
