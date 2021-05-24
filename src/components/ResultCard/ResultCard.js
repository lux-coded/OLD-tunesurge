import React from 'react';
import './ResultCard.scss';

class ResultCard extends React.Component {

  render() {
    const artists = this.props.result.artists.map((artist) => {
      return artist.name
    });
    const { id, name } = this.props.result;
    const { id: albumId } = this.props.result.album;
    const albumArt = this.props.result.album.images[2].url;
    return (
      <article key={id} className='result-card'>
        <img key={albumId} src={albumArt} className='result-image' alt='result'>

        </img>
        <div>
          <p className='song-title'>{name}</p>
          <p className='artist-title'>{artists.join(', ')}</p>
        </div>

      </article>
    );
  }
}

export default ResultCard;
