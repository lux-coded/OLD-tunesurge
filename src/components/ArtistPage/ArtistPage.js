import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ArtistPage.scss';

class ArtistPage extends React.Component {
  state = { artistData: {} }

  componentDidMount() {
    const artistId = this.props.match.params.id;
    this.getArtistData(artistId);
  }

  getArtistData = async (id) => {
    await axios(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      this.setState({ artistData: res.data });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { name } = this.state.artistData;
    return <div>{ name }</div>;
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken
})

export default connect(mapStateToProps)(ArtistPage);
