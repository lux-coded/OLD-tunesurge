import { GET_USER_DATA } from './types.js';

export const getUserData = payload => {
  return {
    type: GET_LOGIN_CODE,
    payload
  };
};
