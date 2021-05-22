import { GET_LOGIN_CODE } from '../actions/types.js';
import { GET_ACCESS_TOKEN } from '../actions/types.js';

const initialState = '';

export const getLoginCode = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_CODE:
      return action.payload
    default:
      return state;
  }
};

export const getAccessToken = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN:
      return action.payload
    default:
      return state;
  }
};
