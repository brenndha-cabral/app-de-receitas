// import requestRates from '../services/apis';

export const LOGIN_INFOS = 'LOGIN_INFOS';

export const setInfoUser = (...stateUser) => ({
  type: LOGIN_INFOS,
  payload: {
    ...stateUser,
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
