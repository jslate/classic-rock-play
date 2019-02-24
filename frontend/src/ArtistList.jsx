import React, { Component } from 'react';
import SvgGradients from './SvgGradients';
import ArtistAddForm from './ArtistAddForm';

class ArtistList extends Component {

  render() {
    return (
      <div className="add">
        <ul>
          {this.props.artists.map((artist) => {
              return (
                <li className={artist.color}>
                  <svg viewBox="0 0 10 10" style={{ width: 10, listStyleType: 'none', display: 'inline-block' }} xmlns="http://www.w3.org/2000/svg">
                    <SvgGradients />
                    <circle cx={5} cy={5} r={5} className={artist.color} fillOpacity="0.6" />
                  </svg>
                  {artist.name} <a href="remove" onClick={(event) => {
                    event.preventDefault();
                    this.props.onRemoveArtist(artist.name);
                  }}>X</a>
                </li>
              )
          })}
        </ul>
        <ArtistAddForm onAddArtist={this.props.onAddArtist} disabled={this.props.haveMaxArtists} />
      </div>
    );
  }
}

export default ArtistList;
