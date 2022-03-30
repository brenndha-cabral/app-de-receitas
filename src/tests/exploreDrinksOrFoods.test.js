import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreDrinksOrFoods from '../pages/exploreDrinksOrFoods/ExploreDrinksOrFoods';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

const EXPLORE_FOODS_ROUTE = '/explore/foods';

describe('1- Testa a página de explorar bebida/comida',
  () => {
    test('Testa se o título "Explore Foods" está na tela', () => {
      renderWithRouterAndRedux(
        <ExploreDrinksOrFoods />, { initialEntries: [EXPLORE_FOODS_ROUTE],
        },
      );

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Explore Foods');
    });

    test('Testa o botão By Ingredient', () => {
      const { history } = renderWithRouterAndRedux(
        <ExploreDrinksOrFoods />, { initialEntries: [EXPLORE_FOODS_ROUTE],
        },
      );
      const ingridientBtn = screen.getByRole('button', { name: /by ingredient/i });
      expect(ingridientBtn).toBeInTheDocument();

      userEvent.click(ingridientBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/explore/foods/ingredients');
    });

    test('Testa o botão Surprise me', () => {
      //  Adicionar mock para teste assíncrono;
      const { history } = renderWithRouterAndRedux(
        <ExploreDrinksOrFoods />, { initialEntries: [EXPLORE_FOODS_ROUTE],
        },
      );

      const surpriseBtn = screen.getByRole('button', { name: /surprise me!/i });
      expect(surpriseBtn).toBeInTheDocument();

      userEvent.click(surpriseBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/explore/foods');
    });

    test('Testa o botão By By Nationality', () => {
      const { history } = renderWithRouterAndRedux(
        <ExploreDrinksOrFoods />, { initialEntries: [EXPLORE_FOODS_ROUTE],
        },
      );
      const nationalityBtn = screen.getByRole('button', { name: /by nationality/i });
      expect(nationalityBtn).toBeInTheDocument();

      userEvent.click(nationalityBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/explore/foods/nationalities');
    });
  });
