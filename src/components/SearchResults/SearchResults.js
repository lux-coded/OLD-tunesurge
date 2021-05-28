import React from 'react';
import './SearchResults.scss';

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ResultCard from '../ResultCard/ResultCard.js';

const SearchResults = ({ results }) => {
  const [ resultPayload, setResultPayload ] = useState([]);

  useEffect(() => {
    if (Object.keys(results).length === 0) return;

    try {
      if ('items' in results.data.tracks) {

        const resultMap = results.data.tracks.items.map((result) => {
          return <ResultCard result={result} key={result.id}/>;
        });
        setResultPayload(resultMap);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      if (!('items' in results.data.tracks)) {

        const resultMap = results.data.tracks.map((result) => {
          return <ResultCard result={result} key={result.id}/>;
        });
        setResultPayload(resultMap);
      }
    } catch (err) {
      console.log(err);
    }


  }, [ results ])

  return (
    <div className='search-results'>
      { resultPayload }
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.getSearchResults
})

export default connect(mapStateToProps)(SearchResults);
