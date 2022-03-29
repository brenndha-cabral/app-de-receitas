import { combineReducers } from 'redux';
import user from './user';
import results from './resultsApi';

const rootReducer = combineReducers({
  user,
  results,
});

export default rootReducer;
