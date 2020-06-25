import React from 'react';

const LoginForm = () => (
  <div>
    <label htmlFor="email">
      Email:
      <input
        id="email"
        type="email"
        placeholder="Digite seu Email"
      />
    </label>
    <label htmlFor="password">
      Senha:
      <input
        id="password"
        type="password"
        placeholder="Digite sua Senha"
      />
    </label>
  </div>
);

export default LoginForm;
