import { combineReducers } from 'redux';
import user from './user';
import results from './resultsApi';
import search from './search';
import details from './resultsDetails';

const rootReducer = combineReducers({
  user,
  search,
  results,
  details,
});

export default rootReducer;
