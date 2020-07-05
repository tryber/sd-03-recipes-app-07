import React from 'react';
import LoginForm from '../Components/LoginForm';
import '../Layout/Login.css';

const Login = () => (
  <div className="main-box">
    <div className="login-box">
      <h1 className="title">App De Receitas</h1>
      <LoginForm />
    </div>
  </div>
);

export default Login;
