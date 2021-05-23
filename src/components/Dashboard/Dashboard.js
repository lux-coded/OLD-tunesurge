import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';
import useAuth from '../useAuth.js';
import getSearchResults from '../../actions/getSearchResults.js';

import './Dashboard.scss';

const Dashboard = ({ searchResults }) => {
  const [ displayName, setDisplayName ] = useState('');
  const [ avatar, setAvatar ] = useState();
  const [ query, setQuery ] = useState('');
  const loginCode = useSelector( state => state.getLoginCode );
  // console.log(loginCode);
  // setAccessToken(useAuth(loginCode));
  // console.log(accessToken);
  const accessToken = useAuth( loginCode );

  // useEffect(() => {
  //   if (!accessToken) return;
  //   axios('https://api.spotify.com/v1/me/top/tracks', {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }, [accessToken])

  useEffect(() => {
    if (!accessToken) return;

    axios('https://api.spotify.com/v1/me', {
      // method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      setDisplayName(res.data.display_name);
      setAvatar(res.data.images[0].url);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [ accessToken ]);

  const fetchSearchResults = (event) => {
    event.preventDefault();

    axios('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        q: query,
        type: 'album,artist,track',
      }
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
    getSearchResults(query, accessToken);
    // console.log(searchResults);
  }

  return (
    <section id='dashboard-container'>
      <div id='dashboard-sidebar' className='dashboard-card'>
        <div id='dashboard-profile'>
          <img src={avatar} alt='avatar'></img>
          <h1>{displayName}</h1>
        </div>
        <form onSubmit={fetchSearchResults} >
          <input type='text' value={query} placeholder='Search...' onChange={(e) => setQuery(e.target.value)}></input>
        </form>
        <div id='dashboard-controls'>
          <h3>My Profile</h3>
          <h3>Favorites</h3>
          <h3>Recommended</h3>
        </div>
      </div>
      <div id='dashboard-panel' className='dashboard-card'>
        <h3>Library</h3>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.getSearchResults
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResults: (query, token) => dispatch(getSearchResults(query, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
