// import requestRates from '../services/apis';

export const LOGIN_INFOS = 'LOGIN_INFOS';
export const SET_RESULTS_API = 'SET_RESULTS_API';

export const setInfoUser = (...stateUser) => ({
  type: LOGIN_INFOS,
  payload: {
    ...stateUser,
  },
});

export const setResultsApi = (results) => ({
  type: SET_RESULTS_API,
  payload: {
    results,
  },
});

// export const fetchRates = (expense) => async (dispatch) => {
//   const dataBase = await requestRates();

//   const totalExpense = {
//     ...expense,
//     exchangeRates: dataBase,
//   };

//   dispatch(setExpenses(totalExpense));
// };
