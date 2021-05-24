import { GET_USER_DATA } from '../actions/types.js';

const initialState = {};

const getUserData = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_DATA:
      // console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getUserData;
