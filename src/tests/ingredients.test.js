/* import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ingredients from '../pages/ingredients/Ingredients';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { foodIngredientsMock } from '../helpers/allMocks';

const NUMBER_TWELVE = 12;

describe('1 - Testa página de explorar comidas por ingredientes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodIngredientsMock),
    });

    renderWithRouterAndRedux(
      <Ingredients />, { initialEntries: ['/explore/foods/ingredients'],
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa se o Título está na tela', () => {
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent(/explore ingredients/i);
  });

  test('Testa se a lista de ingredientes está na tela', () => {
    const list = screen.getAllByTestId(/-ingredient-card/i);
    expect(list).toHaveLength(NUMBER_TWELVE);
  });
});
 */
