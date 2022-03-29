import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreDrinksOrFoods from '../pages/exploreDrinksOrFoods/ExploreDrinksOrFoods';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('1- Testa a página de explorar bebida/comida no caso de ter selecionado bebidas',
  () => {
    test('Testa se o título "Explore Foods" está na tela', () => {
      const { history } = renderWithRouterAndRedux(
        <ExploreDrinksOrFoods />, { initialEntries: ['/explore/foods'],
        },
      );
      const { location: { pathname } } = history;

      const title = screen.getByText('Explore Foods');

      expect(pathname).toBe('/explore/foods');
    });
    test('', () => {

    });
  });

describe('2- Testa a página de explorar bebida/comida no caso de ter selecionado comidas',
  () => {
    test('', () => {

    });
    test('', () => {

    });
    test('', () => {

    });
  });
