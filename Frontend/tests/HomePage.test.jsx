import { describe, test, expect } from 'vitest'; // ✅ חובה להיות ראשון
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../src/pages/HomePage.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage', () => {
  test('renders the welcome message', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('Welcome to SCE Software Ltd.')).toBeTruthy();
  });
});
