import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ArtistPage.scss';

import SearchResults from '../SearchResults/SearchResults.js';
import ResultTile from '../ResultTile/ResultTile.js';

class ArtistPage extends React.Component {
  state = { artistData: {}, artistImage: '', topTracks: {}, albums: {} }

  componentDidMount() {
    const artistId = this.props.match.params.id;
    this.getArtistData(artistId);
    this.getArtistTopTracks(artistId);
    this.getArtistAlbums(artistId);
  }

  componentDidUpdate(prevProps) {
  if (this.props.match.params.id !== prevProps.match.params.id) {
    const artistId = this.props.match.params.id;
    this.getArtistData(artistId);
    this.getArtistTopTracks(artistId);
    this.getArtistAlbums(artistId);
  }
}

  getArtistData = (id) => {
    axios(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      this.setState({ artistData: res.data });
      this.setState({ artistImage: res.data.images[0].url });
      this.setState({ artistFollowers: res.data.followers.total });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getArtistTopTracks = (id) => {
    axios(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
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
      this.setState({ topTracks: res });
    })
    .catch((err) => {
      console.log(err);
      window.location = '/';
    })
  }

  getArtistAlbums = (id) => {
    axios(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`, // Access Token from Redux store.
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        market: `${this.props.userData.data.country}`,
        include_groups: 'album',
        limit: 50
      }
    })
    .then((res) => {
      this.setState({ albums: res.data.items });
    })
    .catch((err) => {
      console.log(err);
      // window.location = '/';
    })
  }

  renderAlbums = () => {
    if (Object.keys(this.state.albums).length === 0) return;

    // const uniqueAlbums = Array.from(new Set(this.state.albums));
    let albumSet = new Set(this.state.albums.map(album => album.name));

    const albums = this.state.albums.map((album) => {
      return <ResultTile key={album.id} result={album} />
    });


    return albums;
  }

  renderFollowers = () => {
    if (isNaN(this.state.artistFollowers)) return;
    const followerNumber = this.state.artistFollowers;
    const formattedFollowerNumber = followerNumber.toLocaleString();
    return formattedFollowerNumber;
  }


  render() {
    const { name } = this.state.artistData;
    const { artistImage, topTracks } = this.state;
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
          <p className='artist-followers'>Followers: {this.renderFollowers()}</p>
        </section>
        <section className='artist-top-tracks'>
          <h2>Top Tracks</h2>
          <br></br>
          <SearchResults results={ topTracks } />
        </section>
        <section className='artist-discography'>
          <h2>Discography</h2>
          <br></br>
          <div className='artist-albums'>
            {this.renderAlbums()}
          </div>
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
