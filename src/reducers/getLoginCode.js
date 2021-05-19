import { GET_LOGIN_CODE } from '../actions/types.js';

const initialState = '';

const getLoginCode = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_CODE:
      return action.payload
    default:
      return state;
  }
};

export default getLoginCode;
