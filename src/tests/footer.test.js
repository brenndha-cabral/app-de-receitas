import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/footer/Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Footer', () => {
  test('Testa se o componente possui a tag footer', () => {
    render(<Footer />);

    const footerEl = screen.getByTestId('footer');
    expect(footerEl).toBeInTheDocument();
  });

  test('Testa se os botões estão na Tela', () => {
    render(<Footer />);

    const drinkInputButton = screen.getByTestId('drinks-bottom-btn');
    const exploreInputButton = screen.getByTestId('explore-bottom-btn');
    const foodInputButton = screen.getByTestId('food-bottom-btn');

    expect(drinkInputButton).toBeInTheDocument();
    expect(exploreInputButton).toBeInTheDocument();
    expect(foodInputButton).toBeInTheDocument();
  });

  test('Testa o redirecionamento para página de bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkInputButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkInputButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });

  test('Testa o redirecionamento para página de explorar', () => {
    const { history } = renderWithRouter(<Footer />);

    const exploreInputButton = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreInputButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore');
  });

  test('Testa o redirecionamento para página de comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const foodInputButton = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodInputButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });
});
