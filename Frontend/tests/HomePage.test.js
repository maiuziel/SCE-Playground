import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../src/pages/HomePage.jsx';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '../src/store/StoreContext'; 

describe('HomePage', () => {
  test('renders the welcome message', () => {
    render(
      <StoreProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </StoreProvider>
    );
    expect(screen.getByText('Welcome to SCE Software Ltd.')).toBeInTheDocument();
  });
});
