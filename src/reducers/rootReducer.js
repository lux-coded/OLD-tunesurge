import { combineReducers } from 'redux';
import { getLoginCode, getAccessToken } from './authReducer.js';
import getSearchResults from './getSearchResults.js';

const rootReducer = combineReducers({
  getLoginCode,
  getAccessToken,
  getSearchResults
});

export default rootReducer;
