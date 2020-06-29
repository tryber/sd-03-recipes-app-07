import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { setLocalStorage } from '../Services';
// import { recipeContext } from '../Hooks/recipeContext';

const RenderEmail = (callback, value) => (
  <label htmlFor="email">
    Email:
    <input
      data-testid="email-input"
      id="email"
      placeholder="Digite seu Email"
      type="email"
      onChange={(e) => callback(e.target.value)}
      value={value}
    />
  </label>
);

const RenderPassword = (callback, value) => (
  <label htmlFor="password">
    Senha:
    <input
      data-testid="password-input"
      id="password"
      placeholder="Digite sua Senha"
      type="password"
      onChange={(e) => callback(e.target.value)}
      value={value}
    />
  </label>
);

const RenderLoginButton = (disabled, callback) => (
  <button
    data-testid="login-submit-btn"
    disabled={disabled}
    type="button"
    onClick={() => callback()}
  >
    Entrar
  </button>
);

const LoginForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const disableButton = () => {
      const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);
      if (regex && password.length > 6) {
        return setDisabled(false);
      }
      return setDisabled(true);
    };
    disableButton();
  }, [email, password]);

  const setLogin = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', { email });
    setIsLogged(true);
  };

  if (isLogged) return <Redirect to="/comidas" />;

  return (
    <div>
      {RenderEmail(setEmail, email)}
      <br />
      {RenderPassword(setPassword, password)}
      <br />
      {RenderLoginButton(disabled, setLogin)}
    </div>
  );
};

export default LoginForm;
