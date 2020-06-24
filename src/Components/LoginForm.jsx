import React from 'react';

const LoginForm = () => (
  <div>
    <label>
      Email:
      <input
        type="email"
        placeholder="Digite seu Email"
      />
    </label>
    <label>
      Senha:
      <input
        type="password"
        placeholder="Digite sua Senha"
      />
    </label>
  </div>
);

export default LoginForm;
