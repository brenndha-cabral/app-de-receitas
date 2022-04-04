import { combineReducers } from 'redux';
import user from './user';
import results from './resultsApi';
import search from './search';

const rootReducer = combineReducers({
  user,
  search,
  results,
});

export default rootReducer;
