import { render } from '@testing-library/react';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouterAndRedux;
