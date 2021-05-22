import { GET_LOGIN_CODE } from './types.js';
import { GET_ACCESS_TOKEN } from './types.js';

export const getLoginCode = code => {
  return {
    type: GET_LOGIN_CODE,
    payload: code
  };
};

export const getAccessToken = token => {
  return {
    type: GET_ACCESS_TOKEN,
    payload: token
  };
};
