import React from 'react';
import './SearchResults.scss';

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ResultCard from '../ResultCard/ResultCard.js';

const SearchResults = ({ searchResults }) => {
  const propsResults = searchResults
  const [ results, setResults ] = useState([]);

  useEffect(() => {
    if (Object.keys(searchResults).length === 0) return;

    try {
      const results = searchResults.data.tracks.items.map((result) => {
        return <ResultCard result={result} key={result.id}/>;
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
