import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ResultTile from '../ResultTile/ResultTile.js';

import './Home.scss';

const Home = ({ accessToken, userData }) => {

  const [ newReleases, setNewReleases ] = useState([]);

  useEffect(() => {
    fetchNewReleases();
  }, [ accessToken ]);

  async function fetchNewReleases() {
    await axios('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      setNewReleases(res.data.albums.items);
    })
  }

  const renderNewReleases = () => {
    // if (this.state.newReleases.length !== 0) return;

    const newReleasesMap = newReleases.map((result) => {
      return <ResultTile key={result.id} result={result} />
    });

    console.log(newReleasesMap);

    return newReleasesMap;

  }
  return (
    <section id='home'>
      <h2>New Releases</h2>
      <div className='home-categories'>
        {renderNewReleases()}
      </div>
      <br></br>
      <h2>Categories</h2>
    </section>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  userData: state.getUserData
})
export default connect(mapStateToProps)(Home);
