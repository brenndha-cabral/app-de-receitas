import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/explore/Explore';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Footer', () => {
  beforeEach(() => {
    renderWithRouter(<Explore />);
  })

  test('Testa se o componente possui a tag footer', () => {

  });

  test('Testa se os botões estão na Tela', () => {

  });

  test('Testa o redirecionamento para página de bebidas', () => {

  });

  test('Testa o redirecionamento para página de explorar', () => {

  });

  test('Testa o redirecionamento para página de comidas', () => {

  });
});
