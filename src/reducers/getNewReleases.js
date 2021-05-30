import { GET_NEW_RELEASES } from '../actions/types.js';

const initialState = {};

const getNewReleases = (state = initialState, action) => {
  switch(action.type) {
    case GET_NEW_RELEASES:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getNewReleases;
