import { GET_SEARCH_RESULTS } from './types.js';
import axios from 'axios';

const saveSearchResults = payload => ({
  type: GET_SEARCH_RESULTS,
  payload
});

const getSearchResults = (query, token) => {
  return dispatch => {
    axios('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        q: query,
        type: 'album,artist,track',
      }
    })
    .then(res => {
      console.log(res);
      dispatch(saveSearchResults(res))
    })
    // .then(data => dispatch(saveSearchResults(data)))
    .catch(error => console.log(error))
  };
};

export default getSearchResults;
