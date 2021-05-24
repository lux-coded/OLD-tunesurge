import { GET_SEARCH_RESULTS } from '../actions/types.js';

const initialState = {};

const getSearchResults = (state = initialState, action) => {
  switch(action.type) {
    case GET_SEARCH_RESULTS:
      // console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getSearchResults;
