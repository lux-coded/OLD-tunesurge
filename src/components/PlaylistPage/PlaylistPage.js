import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ResultCard from '../ResultCard/ResultCard.js';

import './PlaylistPage.scss';

const PlaylistPage = ({ match, accessToken }) => {
  const [ playlistData, setPlaylistData ] = useState({});
  const [ playlistImage, setPlaylistImage ] = useState('');
  const [ playlistTracks, setPlaylistTracks ] = useState([]);
  const playlistId = match.params.id;

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      setPlaylistData(res.data);
      setPlaylistImage(res.data.images[0].url);
      displayPlaylistTracks(res.data.tracks.items);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const displayPlaylistTracks = (tracks) => {
    try {
      const resultMap = tracks.map((result) => {
        return <ResultCard result={result} key={result.id}/>;
      });

      setPlaylistTracks(resultMap);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id='playlist-page'>
      <div className='playlist-header'>
        <img src={ playlistImage } className='playlist-art' alt='playlist-art'></img>
        <div className='playlist-info'>
          <h1>{ playlistData.name }</h1>
          <p className='playlist-description'>{playlistData.description}</p>
        </div>
      </div>
      <div className='playlist-tracks'>
        {playlistTracks}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  albumData: state.getAlbumData
})

export default connect(mapStateToProps)(PlaylistPage);
