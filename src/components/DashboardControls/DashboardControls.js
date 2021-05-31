import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history.js';
import './DashboardControls.scss';

import getSearchResults from '../../actions/getSearchResults.js';

import SearchBar from '../SearchBar/SearchBar.js';

class DashboardControls extends React.Component {

  fetchSearchResults = (query) => {
    this.props.getSearchResults(query, this.props.accessToken);
    history.push(`/search/${query}`);
  }

  render() {
    return (
      <div id='mobile-dashboard-sidebar' className='mobile-dashboard-card hidden'>
        <div id='mobile-dashboard-profile'>
          <img src='' alt='avatar'></img>
          <h1>{this.props.userData.display_name}</h1>
        </div>
        <SearchBar onSubmit={this.fetchSearchResults}/>
        <div id='mobile-dashboard-controls'>
          <Link to='/' className='mobile-dashboard-link'>
            <span className="material-icons">
              home
            </span>
            Home
          </Link>
          <Link to='/profile' className='mobile-dashboard-link'>
            <span className="material-icons">
              person
            </span>
            My Profile
          </Link>
          <div className='mobile-dashboard-link'>
            <span className="material-icons">
              library_music
            </span>
            Playlists
          </div>
          <hr></hr>
          <h4>Favorites</h4>
          <h4>Recommended</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.getSearchResults,
  userData: state.getUserData,
  accessToken: state.getAccessToken
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResults: (query, token) => dispatch(getSearchResults(query, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardControls);
