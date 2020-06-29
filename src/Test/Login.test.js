import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Pages/Login';

test('verify email input in page', () => {
  const { getByText } = render(<Login />);
  const inputEmail = getByText(/Email/i);
  expect(inputEmail).toBeInTheDocument();
});

test('verify password input in page', () => {
  const { getByText } = render(<Login />);
  const inputPassword = getByText(/Senha/i);
  expect(inputPassword).toBeInTheDocument();
});

test('Login in form', () => {
  const { getByText } = render(<Login />);
  const loginForm = getByText(/Entrar/i);
  fireEvent.click(loginForm);
  // const redirectToRecipes = getByText(/Tela principal de receita/i);
  // expect(redirectToRecipes).toBeInTheDocument();
});
