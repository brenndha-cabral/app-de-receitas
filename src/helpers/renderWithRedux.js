import React from 'react';
import { createStore, combineReducers } from 'redux';
import rootReducer from '../redux/reducers';
import renderWithRouter from './renderWithRouter';

const renderWithRedux = (
  component,
  { initialState,
    store = createStore(rootReducer, initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
});

export default renderWithRedux;
