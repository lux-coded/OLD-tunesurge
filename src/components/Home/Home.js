import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ResultTile from '../ResultTile/ResultTile.js';

import './Home.scss';

const Home = ({ accessToken, userData, token }) => {

  const [ newReleases, setNewReleases ] = useState([]);
  const [ featuredPlaylists, setFeaturedPlaylists ] = useState([]);

  useEffect(() => {
    fetchNewReleases();
    fetchFeaturedPlaylists();
  }, [ token ]);

  async function fetchNewReleases() {
    if(!token) return;

    await axios('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      setNewReleases(res.data.albums.items);
    })
    .catch((err) => {
      console.error(err);
    })

  }

  async function fetchFeaturedPlaylists() {
    if(!token) return;
    await axios('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        limit: 20,
      }
    })
    .then((res) => {
      console.log(res);
      setFeaturedPlaylists(res.data.playlists.items);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  const renderNewReleases = () => {
    // if (this.state.newReleases.length !== 0) return;

    const newReleasesMap = newReleases.map((result) => {
      return <ResultTile key={result.id} result={result} />
    });

    return newReleasesMap;

  }

  const renderFeaturedPlaylists = () => {
    const featuredPlaylistsMap = featuredPlaylists.map((result) => {
      return <ResultTile key={result.id} result={result} />
      // return (
      //   <article className='playlist-tile' key={result.id}>
      //     <img src={result.images[0].url}></img>
      //     {result.name}
      //   </article>
      // );
    });

    return featuredPlaylistsMap;
  }
  return (
    <section id='home'>
      <h2>New Releases</h2>
      <div className='home-section'>
        {renderNewReleases()}
      </div>
      <br></br>
      <h2>Featured Playlists</h2>
      <div className='home-section'>
        {renderFeaturedPlaylists()}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  userData: state.getUserData,
})
export default connect(mapStateToProps)(Home);
