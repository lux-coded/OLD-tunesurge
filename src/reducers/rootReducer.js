import { combineReducers } from 'redux';
import { getLoginCode, getAccessToken } from './authReducer.js';
import getSearchResults from './getSearchResults.js';
import getUserData from './getUserData.js';

const rootReducer = combineReducers({
  getLoginCode,
  getAccessToken,
  getSearchResults,
  getUserData
});

export default rootReducer;
