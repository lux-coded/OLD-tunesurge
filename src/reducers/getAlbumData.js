import { GET_ALBUM_DATA } from '../actions/types.js';

const initialState = {};

const getAlbumData = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALBUM_DATA:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getAlbumData;
