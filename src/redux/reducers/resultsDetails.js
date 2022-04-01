import { SET_DETAILS } from '../actions';

const INITIAL_STATE = {
  id: '',
  photo: '',
  name: '',
  type: '',
  ingredients: '',
  quantity: '',
  instructions: '',
};

const details = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_DETAILS:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default details;
