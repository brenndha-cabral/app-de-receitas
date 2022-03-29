import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/explore/Explore';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('Testa o componente Footer', () => {
/*   beforeEach(() => {
    const { history } = renderWithRouterAndRedux(<Explore />);
  }); */

  test('Testa se os botões de explorar comidas e bebidas estão na tela', () => {
    renderWithRouterAndRedux(<Explore />);

    const exploreFoodsBtn = screen.getByRole('button', { name: /explore foods/i });
    const exploreDrinksBtn = screen.getByRole('button', { name: /explore drinks/i });

    expect(exploreFoodsBtn).toBeInTheDocument();
    expect(exploreDrinksBtn).toBeInTheDocument();
  });

  test('Testa o redirecionamento de págida do Botão Explore Foods', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);

    const exploreFoodsBtn = screen.getByRole('button', { name: /explore foods/i });
    userEvent.click(exploreFoodsBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods');
  });

  test('Testa o redirecionamento de página do Botão Explore Drinks', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);

    const exploreDrinksBtn = screen.getByRole('button', { name: /explore drinks/i });
    userEvent.click(exploreDrinksBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
