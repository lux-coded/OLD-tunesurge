import React from 'react';
import './SearchResults.scss';

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ResultCard from '../ResultCard/ResultCard.js';

const SearchResults = ({ searchResults }) => {
  const [ results, setResults] = useState([]);

  useEffect(() => {
    if (!searchResults) return;

    try {
      const results = searchResults.data.tracks.items.map((result) => {
        return <ResultCard result={result}/>;
      });
      setResults(results);
      console.log(searchResults.data.tracks.items);
    } catch (err) {
      console.log(err);
    }


  }, [ searchResults ])

  return (
    <div className='search-results'>
      {results}
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.getSearchResults
})

export default connect(mapStateToProps)(SearchResults);
