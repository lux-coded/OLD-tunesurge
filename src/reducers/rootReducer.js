import { combineReducers } from 'redux';
import { getLoginCode, getAccessToken } from './authReducer.js';
import getSearchResults from './getSearchResults.js';
import getUserData from './getUserData.js';
import getAlbumData from './getAlbumData.js';
import getNewReleases from './getNewReleases.js';

const rootReducer = combineReducers({
  getLoginCode,
  getAccessToken,
  getSearchResults,
  getUserData,
  getNewReleases
});

export default rootReducer;
