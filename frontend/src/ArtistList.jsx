import React, { Component } from 'react';
import SvgGradients from './SvgGradients';

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
        <form onSubmit={(event) => {
           event.preventDefault();
           const textField = event.target.children[0];
           this.props.onAddArtist(textField.value);
           textField.value = '';
           textField.focus();
        }}>
          <input type="text" name="artist"  disabled={this.props.haveMaxArtists} defaultValue="Led Zeppelin" />
          <input type="submit" value="Add" disabled={this.props.haveMaxArtists} />
        </form>
      </div>
    );
  }
}

export default ArtistList;
