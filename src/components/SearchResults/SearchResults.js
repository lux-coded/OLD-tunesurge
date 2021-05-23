import React from 'react';
import './SearchResults.scss';
import { connect } from 'react-redux';

class SearchResults extends React.Component {

  render() {
    // this.props.getSearchResults.map((results) => {
    //   console.log(results.tracks.items);
    // })
    return <div>SearchResults</div>;
  }
}

const mapStateToProps = (state) => ({
  getSearchResults: state.getSearchResults
})

export default connect(mapStateToProps)(SearchResults);
