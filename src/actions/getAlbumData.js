import { GET_ALBUM_DATA } from './types.js';
import axios from 'axios';

const saveAlbumData = payload => ({
  type: GET_ALBUM_DATA,
  payload
});

const getAlbumData = (token, id) => {
  return (dispatch) => {
    axios(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(saveAlbumData(res))
    })
    .catch((err) => {
      console.log(err);
    })
  };
};

export default getAlbumData;
