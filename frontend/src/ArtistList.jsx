import React, { Component } from 'react';
import SvgGradients from './SvgGradients';
import ArtistAddForm from './ArtistAddForm';

class ArtistList extends Component {

  removeArtist = (artist) => {
    return (event) => {
      event.preventDefault();
      this.props.onRemoveArtist(artist.name);
    }
  }

  render = () => (
    <div className="add">
      <ul>
        {this.props.artists.map((artist) => (
          <li key={artist.name} className={artist.color}>
            <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <SvgGradients />
              <circle cx={5} cy={5} r={5} className={artist.color} fillOpacity="0.6" />
            </svg>
            {artist.name}
            <a href="remove" onClick={this.removeArtist(artist)}>X</a>
          </li>
        ))}
      </ul>
      <ArtistAddForm
        onAddArtist={this.props.onAddArtist}
        disabled={this.props.haveMaxArtists}
      />
    </div>
  )
}

export default ArtistList;
