import { GET_USER_DATA } from './types.js';
import axios from 'axios';

const saveUserData = payload => ({
  type: GET_USER_DATA,
  payload
});

const getUserData = (token) => {
  return dispatch => {
    axios('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(saveUserData(res))
    })
    .catch((err) => {
      console.log(err);
    })
  };
};

export default getUserData;
