import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const renderContent = (userEmail) => (
  <div className='profileContainer'>
    <div className='userEmail' data-testid='profile-email'>
      {userEmail.email}
    </div>
    <Link to='/receitas-feitas'>
      <button
        className='done-recipes-btn'
        data-testid='profile-done-btn'
        type='button'
      >
        Receitas Feitas
      </button>
    </Link>
    <Link to='/receitas-favoritas'>
      <button
        className='fav-recipes-btn'
        data-testid='profile-favorite-btn'
        type='button'
      >
        Receitas Favoritas
      </button>
    </Link>
    <Link to='/'>
      <button
        className='logout-btn'
        data-testid='profile-logout-btn'
        type='button'
        onClick={() => localStorage.clear()}
      >
        Sair
      </button>
    </Link>
  </div>
);

const Profile = () => {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header />
      {renderContent(userEmail)}
      <Footer />
    </div>
  );
};

export default Profile;
