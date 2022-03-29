import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const history = createMemoryHistory();

  const renderReturn = render(
    <Router history={ history }>{ component }</Router>,
  );

  return (
    { history, ...renderReturn }
  );
}

export default renderWithRouter;
