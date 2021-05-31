import React from 'react';
import { Link } from 'react-router-dom';
import './ResultCard.scss';

class ResultCard extends React.Component {
  render() {
    const artists = this.props.result.artists.map((artist) => {
        return <p key={artist.id} className='artist-title-container'><Link to={`/artists/${artist.id}`} value={artist.name} className='artist-title'>{artist.name}</Link></p>
          });

    const resultData = this.props.result;
    const { name: trackName, duration_ms } = resultData;

    function millisToMinutesAndSeconds(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const image = resultData.album ? resultData.album.images[2].url : null;
    // const albumArt = this.props.result.album.images[2].url;

    return (
      <div className={image ? 'result-card top-tracks' : 'result-card album-tracks'}>

        {
          image ?
            <img src={ image } className='result-image' alt='result'></img>
          : ''
        }

        <div className={ image ? 'song-info' : 'album-song-info'}>
          <p className='song-title'>{ trackName }</p>

          {
            this.props.result.album ?
            <div>
              <span className='artist-title'>{ artists }</span>
              <br></br>
              <span><Link to={`/album/${resultData.album.id}`} className='album-title'>{ resultData.album.name }</Link></span>
            </div>
            :
            ''
          }


        </div>
        <p className='song-runtime'>{millisToMinutesAndSeconds(duration_ms)}</p>
      </div>
    );
  }
}

export default ResultCard;
