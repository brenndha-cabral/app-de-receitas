// import requestRates from '../services/apis';

export const LOGIN_INFOS = 'LOGIN_INFOS';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_RESULTS_API = 'SET_RESULTS_API';
export const SET_DETAILS = 'SET_DETAILS';

export const setInfoUser = (stateUser) => ({
  type: LOGIN_INFOS,
  payload: {
    ...stateUser,
  },
});

export const setSearch = (search) => ({
  type: SET_SEARCH,
  search,
});

export const setResultsApi = (results) => ({
  type: SET_RESULTS_API,
  results,
});

export const setDetails = (payload) => ({
  type: SET_DETAILS,
  payload,
});
