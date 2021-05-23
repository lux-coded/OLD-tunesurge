import React from 'react';
import './SearchBar.scss';

class SearchBar extends React.Component {
  state = { searchQuery: '' };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <div className='SearchBar'>
        <form onSubmit={this.onFormSubmit} className='search-form'>
          <input
            type='text'
            placeholder='Search...'
            value={this.state.searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })} className='search-input'>
          </input>
        </form>
      </div>
    );
  }
}

export default SearchBar;
