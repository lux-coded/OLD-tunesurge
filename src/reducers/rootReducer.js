import { combineReducers } from 'redux';
import { getLoginCode, getAccessToken } from './authReducer.js';
import getSearchResults from './getSearchResults.js';
import getUserData from './getUserData.js';
import getAlbumData from './getAlbumData.js';

const rootReducer = combineReducers({
  getLoginCode,
  getAccessToken,
  getSearchResults,
  getUserData,
  getAlbumData
});

export default rootReducer;
