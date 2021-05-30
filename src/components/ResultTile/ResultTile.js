import React from 'react';
import './ResultTile.scss';

class ResultTile extends React.Component {

  render() {
    const resultData = this.props.result;
    const { id, name, uri, href } = resultData;
    const image = resultData.album ? resultData.album.images[1].url : resultData.images[1].url;

    return (
      <article className='result-tile'>
        <img src={image}></img>
        <h3>{name}</h3>
      </article>
    );
  }
}

export default ResultTile;
