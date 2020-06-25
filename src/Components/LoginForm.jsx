import React, { useEffect, useState } from 'react';

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

const RenderLoginButton = (disabled) => (
  <button
    data-testid="login-submit-btn"
    type="button"
    disabled={disabled}
  >
    Entrar
  </button>
);

const LoginForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const disableButton = () => {
      const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(email);
      if (regex && password.length >= 6) {
        return setDisabled(false);
      }
      return setDisabled(true);
    };

    disableButton();
  }, [email, password]);

  return (
    <div>
      {RenderEmail(setEmail, email)}
      <br />
      {RenderPassword(setPassword, password)}
      <br />
      {RenderLoginButton(disabled)}
    </div>
  );
};

export default LoginForm;
