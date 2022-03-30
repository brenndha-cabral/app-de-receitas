import { SET_RESULTS_API } from '../actions';

const INITIAL_STATE = [];

const results = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_RESULTS_API:

    return [...action.results];

  default:
    return state;
  }
};

export default results;
