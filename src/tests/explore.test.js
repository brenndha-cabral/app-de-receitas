import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/explore/Explore';
import renderWithRouter from '../helpers/renderWithRouter';
import renderWithRedux from '../helpers/renderWithRedux';

describe('Testa o componente Footer', () => {
  beforeEach(() => {
    renderWithRedux(<Explore />);
  });

  const exploreFoodsBtn = screen.getByRole('button', { name: /explore foods/i });
  const exploreDrinksBtn = screen.getByRole('button', { name: /explore drinks/i });

  test('Testa se os botões de explorar comidas e bebidas estão na tela', () => {


    expect(exploreFoodsBtn).toBeInTheDocument();
    expect(exploreDrinksBtn).toBeInTheDocument();
  });

  test('Testa o redirecionamento de págida do Botão Explore Foods', () => {

  });

/*   test('Testa o redirecionamento para página de bebidas', () => {

  });

  test('Testa o redirecionamento para página de explorar', () => {

  });

  test('Testa o redirecionamento para página de comidas', () => {

  }); */
});
