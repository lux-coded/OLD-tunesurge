import { combineReducers } from 'redux';
import { getLoginCode, getAccessToken } from './authReducer.js';

const rootReducer = combineReducers({
  getLoginCode,
  getAccessToken
});

export default rootReducer;
