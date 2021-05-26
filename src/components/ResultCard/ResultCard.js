import React from 'react';
import { Link } from 'react-router-dom';
import './ResultCard.scss';

class ResultCard extends React.Component {
  componentDidMount() {

  }
  render() {
    const artists = this.props.result.artists.map((artist) => {
        return <p key={artist.id} className='artist-title-container'><Link to={`/artists/${artist.id}`} value={artist.name} className='artist-title'>{artist.name}</Link></p>
          });

    const { id, name, uri, href } = this.props.result;
    const albumArt = this.props.result.album.images[2].url;
    return (
      <div className='result-card'>
        <img src={albumArt} className='result-image' alt='result'></img>
        <div>
          <p className='song-title'>{name}</p>
          <span>{artists}</span>
        </div>
      </div>
    );
  }
}

export default ResultCard;
