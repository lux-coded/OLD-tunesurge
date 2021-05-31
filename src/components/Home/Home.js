import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import getNewReleases from '../../actions/getNewReleases.js';

// import ResultTile from '../ResultTile/ResultTile.js';

class Home extends React.Component {
  state = { newReleases: [] }

  componentDidMount() {
    this.fetchNewResults();
  }

  fetchNewResults = async () => {
      await axios('https://api.spotify.com/v1/browse/categories', {
        headers: {
          'Authorization': `Bearer ${this.props.accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {

    return (
      <section id='home'>
        <div>
          <h2>New Releases</h2>
          {/* {
            newReleasesResults.length ?
            newReleasesResults :
            <span>Loading...</span>
            }
          {newReleasesResults} */}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.getAccessToken,
  newReleases: state.getNewReleases
})

const mapDispatchToProps = (dispatch) => ({
  getNewReleases: (token) => dispatch(getNewReleases(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
