import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Layout/Profile.css';

const renderContent = (userEmail) => (
  <div className="profileContainer-main">
    <div className="profileContainer">
      <div
        className="userEmail"
        data-testid="profile-email"
      >
        {userEmail.email}
      </div>
      <Link to="/receitas-feitas" className="profile-link">
        <button
          className="profile-btn"
          data-testid="profile-done-btn"
          type="button"
        >
          Receitas Feitas
      </button>
      </Link>
      <Link to="/receitas-favoritas" className="profile-link">
        <button
          className="profile-btn"
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
      </button>
      </Link>
      <Link to="/" className="profile-link">
        <button
          className="profile-btn"
          data-testid="profile-logout-btn"
          type="button"
          onClick={() => localStorage.clear()}
        >
          Sair
      </button>
      </Link>
    </div>
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
