import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ArtistPage.scss';

import SearchResults from '../SearchResults/SearchResults.js';

class ArtistPage extends React.Component {
  state = { artistData: {}, artistImage: '', topTracks: {}, albums: {} }

  componentDidMount() {
    // const currentUserData = sessionStorage.getItem('currentUser');
    // console.log(currentUserData);
    const artistId = this.props.match.params.id;
    this.getArtistData(artistId);
    this.getArtistTopTracks(artistId);
    this.getArtistAlbums(artistId);
  }

  getArtistData = async (id) => {
    await axios(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      // console.log(res);
      this.setState({ artistData: res.data });
      this.setState({ artistImage: res.data.images[0].url });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getArtistTopTracks = async (id) => {
    await axios(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        market: `${this.props.userData.data.country}`
      }
    })
    .then((res) => {
      console.log(res);
      this.setState({ topTracks: res });
    })
    .catch((err) => {
      console.log(err);
      window.location = '/';
    })
  }

  getArtistAlbums = async (id) => {
    await axios(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        market: `${this.props.userData.data.country}`,
        include_groups: 'album'
      }
    })
    .then((res) => {
      console.log(res);
      this.setState({ albums: res });
    })
    .catch((err) => {
      console.log(err);
      window.location = '/';
    })
  }


  render() {
    const { name } = this.state.artistData;
    const { artistImage, topTracks, albums } = this.state;
    const divStyle = {
      // color: 'white',
      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%), url(${artistImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '100% 25%'
    };
    return (
      <section className='artist-page'>
        <section className='artist-banner' style={divStyle}>
          <h1 className='artist-name'>{ name }</h1>
        </section>
        <section className='artist-top-tracks'>
          <h2>Top Tracks</h2>
          <br></br>
          <SearchResults results={ topTracks } />
        </section>
        <section className='artist-discography'>
          <h2>Discography</h2>
          <br></br>
          {/* <SearchResults results={ albums } /> */}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  userData: state.getUserData
})

export default connect(mapStateToProps)(ArtistPage);
