import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import history from '../../history.js';

import useAuth from '../useAuth.js';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import getSearchResults from '../../actions/getSearchResults.js';

import './Dashboard.scss';

const Dashboard = ({ getSearchResults }) => {
  const [ displayName, setDisplayName ] = useState('');
  const [ avatar, setAvatar ] = useState();
  const [ query, setQuery ] = useState('');
  const loginCode = useSelector( state => state.getLoginCode );
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

  // let params = useParams();
  // useEffect(() => {
  //   // if (match.params.query) {
  //   //   fetchSearchResults();
  //   // }
  //   // console.log(params);
  // }, [params])

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
      // console.log(res);
      setDisplayName(res.data.display_name);
      setAvatar(res.data.images[0].url);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [ accessToken ]);

  const fetchSearchResults = (query) => {
    setQuery(query);
    getSearchResults(query, accessToken);
    history.push(`/search/${query}`);
  }

  return (
    <section id='dashboard-container'>
      <div id='dashboard-sidebar' className='dashboard-card'>
        <div id='dashboard-profile'>
          <img src={avatar} alt='avatar'></img>
          <h1>{displayName}</h1>
        </div>
        <SearchBar onSubmit={fetchSearchResults}/>
        <div id='dashboard-controls'>
          <h3>My Profile</h3>
          <h3>Favorites</h3>
          <h3>Recommended</h3>
        </div>
      </div>
      <div id='dashboard-panel' className='dashboard-card'>
        <SearchResults />
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  getSearchResults: state.getSearchResults,
  getAccessToken: state.getAccessToken
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResults: (query, token) => dispatch(getSearchResults(query, token)),
  getAccessToken: () => dispatch({ type: 'GET_ACCESS_TOKEN' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);