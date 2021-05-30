import { GET_NEW_RELEASES } from './types.js';
import axios from 'axios';

const saveNewReleases = payload => ({
  type: GET_NEW_RELEASES,
  payload
});

const getNewReleases = (token) => {
  return async (dispatch) => {
     await axios(`https://api.spotify.com/v1/browse/new-releases`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res.data);
      dispatch(saveNewReleases(res))
    })
    .catch((err) => {
      console.log(err);
    })
  };
};

export default getNewReleases;
