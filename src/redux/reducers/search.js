import { SET_SEARCH } from '../actions';

const INITIAL_STATE = '';

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SEARCH:
    return action.search;

  default:
    return state;
  }
};

export default search;
