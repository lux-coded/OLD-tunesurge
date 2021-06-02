import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Profile.scss';

import ResultTile from '../ResultTile/ResultTile.js';

class Profile extends React.Component {
  state = { userTopTracks: [], userTopArtists: [] }

  componentDidMount() {
    this.fetchUserTopTracks();
    this.fetchUserTopArtists();
  }

  fetchUserTopTracks = async () => {
    if (Object.keys(this.props.accessToken).length === 0) return;
    await axios(`https://api.spotify.com/v1/me/top/tracks`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      this.setState({ userTopTracks: res.data.items })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  fetchUserTopArtists = async () => {
    if (Object.keys(this.props.accessToken).length === 0) return;
    await axios(`https://api.spotify.com/v1/me/top/artists`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      this.setState({ userTopArtists: res.data.items });
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    const { display_name } = this.props.userData;
    const avatar = this.props.userData.images[0].url;

    const topTracks = this.state.userTopTracks.map((track) => {
      return <ResultTile key={track.id} result={track} />
    })

    const topArtists = this.state.userTopArtists.map((artist) => {
      return <ResultTile key={artist.id} result={artist} />
    })

    return (
      <div id='profile-page'>
        <img id='profile-page-avatar' src={avatar} alt='avatar'></img>
        <h1>{display_name}</h1>
        <div className='profile-section'>
          <h2>Top Tracks</h2>
          <div className='profile-results'>
            {topTracks}
          </div>
        </div>
        <div className='profile-section'>
          <h2>Top Artists</h2>
          <div className='profile-results'>
            {topArtists}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  userData: state.getUserData
});

export default connect(mapStateToProps)(Profile);
