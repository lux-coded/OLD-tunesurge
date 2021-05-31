import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './AlbumPage.scss';

import getAlbumData from '../../actions/getAlbumData.js';

import ResultCard from '../ResultCard/ResultCard.js';

const AlbumPage = ({ accessToken, match }) => {
  const [ albumData, setAlbumData ] = useState({});
  const [ albumImage, setAlbumImage ] = useState('');
  const [ albumTracks, setAlbumTracks ] = useState([]);

  useEffect(() => {
    const albumId = match.params.id;
    getAlbumData(albumId);
  }, [])

  const getAlbumData = async (id) => {
    axios(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      setAlbumData(res.data);
      setAlbumImage(res.data.images[0].url);
      displayAlbumTracks(res.data.tracks.items);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const displayAlbumTracks = async (tracks) => {
    try {
      const resultMap = tracks.map((result) => {
        return <ResultCard result={result} key={result.id}/>;
      });

      setAlbumTracks(resultMap);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id='album-page'>
      <img src={ albumImage } className='album-art' alt='album-art'></img>
      <div className='album-info'>
        <h1>{ albumData.name }</h1>
      </div>
      <div className='album-tracks'>
        {albumTracks}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  albumData: state.getAlbumData
})

export default connect(mapStateToProps, { getAlbumData })(AlbumPage);
