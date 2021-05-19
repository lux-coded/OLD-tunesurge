import { GET_LOGIN_CODE } from './types.js';

const getLoginCode = code => {
  return {
    type: GET_LOGIN_CODE,
    payload: code
  };
};

export default getLoginCode;
