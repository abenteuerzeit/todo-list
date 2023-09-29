import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO LIST App', () => {
  render(<App />);
  const linkElement = screen.getByText(/TODO LIST App/i);
  expect(linkElement).toBeInTheDocument();
});
