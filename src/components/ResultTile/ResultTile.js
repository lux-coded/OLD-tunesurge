import React from 'react';
import { Link } from 'react-router-dom';

import './ResultTile.scss';

class ResultTile extends React.Component {

  renderArtists(artists) {
    const tileArtists = artists.map((artist) => {
      return <p key={artist.id} className='artist-title'>{artist.name}</p>
    });

    const truncatedArtists = tileArtists.slice(0,2);

    return truncatedArtists;
  }

  resultType = (resultData) => {
    if (resultData.type === 'album') {
      return `/album/${resultData.id}`;
    }
    if (resultData.type === 'artist') {
      return `/artists/${resultData.id}`;
    }
    if (resultData.type === 'track') {
      return `/album/${resultData.album.id}`;
    }
  }

  render() {

    const resultData = this.props.result;
    const { name, type } = resultData;
    const image = resultData.album ? resultData.album.images[1].url : resultData.images[1].url;

    return (
      <Link to={this.resultType(resultData)} className='result-tile'>
        <img src={image}></img>
        {

          resultData.artists ?  // Checks if current data loop contains 'artists' property.

            // If yes, render artists.
              <div>
                <h4>{name}</h4>
                {this.renderArtists(resultData.artists)}
              </div>

          :

          <h3>{name}</h3> // Else, render the name property in 'root' of object.

        }
      </Link>
    );
  }
}

export default ResultTile;
