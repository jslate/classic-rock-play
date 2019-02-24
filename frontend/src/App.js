import React, { Component } from 'react';
import './App.css';
import SvgGradients from './SvgGradients';
import ArtistList from './ArtistList';
const url = require('url');

class App extends Component {
  colors = ['red', 'yellow', 'blue', 'green'];

  state = {
    songs: [],
    artists: [],
    artistColors: {},
  }

  fetchSongs = () => {
    fetch(`/songs?artists=${this.state.artists.join(',')}`)
      .then(res => res.json())
      .then(songs => {
        const uniqueArtists = new Set(JSON.parse(songs).map((song) => song.artist));
        const artistColors = {};
        const iterator = uniqueArtists.values();
        let result = iterator.next();
        let index = 0;
        while (!result.done) {
         artistColors[result.value] = this.colors[index];
         index++;
         result = iterator.next();
        }
        this.setState({ songs: JSON.parse(songs), artistColors: artistColors });
      });
  }

  renderSongRows = () => {
    if (typeof(this.state.songs.map) == 'function') {
      return this.state.songs.map(song =>
        <tr key={song.id}>
          <td>{song.name}</td>
          <td>{song.artist}</td>
          <td>{song.release_year}</td>
          <td>{song.play_count}</td>
        </tr>
      );
    }
  }

  elipsify = (string, maxLength) => (
    string.length > maxLength ? `${string.slice(0,maxLength)}…` : string
  )

  renderSongCirles = () => {
    return this.state.songs.map((song, index) => {
     const y = (index % 6) * 20 + 30;
     const color = this.state.artistColors[song.artist];
     const fontSize = 300/(200 - song.play_count);
     return (
       <g key={song.id}>
         <circle cx={(song.release_year - 1965) * 10} cy={y} r={song.play_count/6} className={color} fillOpacity="0.6" />
         <text x={(song.release_year - 1965) * 10} y={y} textAnchor="middle" fontSize={fontSize} fill="black">{this.elipsify(song.name, 20)}</text>
         <text x={(song.release_year - 1965) * 10} y={y + fontSize * 1.5} textAnchor="middle" fontSize={fontSize} fill="black">{song.release_year}</text>
       </g>
     )
    });
  }

  haveMaxArtists = () => (this.state.artists.length >= this.colors.length);

  removeArtist = (name) => {
    this.setState({ artists: this.state.artists.filter((a) => a !== name)}, this.fetchSongs);
  }

  addArtist = (name) => {
    this.setState({ artists: [...this.state.artists, name]}, () => {
      this.fetchSongs();
    });
  }

  artistHashes = () => (
    this.state.artists.map((artist) => { return { name: artist, color: this.state.artistColors[artist]}})
  )

  render() {
    return (
      <div className="App">
        <ArtistList artists={this.artistHashes()} onRemoveArtist={this.removeArtist} onAddArtist={this.addArtist} haveMaxArtists={this.haveMaxArtists()}/>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <SvgGradients />
          {this.renderSongCirles()}
        </svg>
        <table>
          <thead>
            <tr>
              <td>name</td>
              <td>artist</td>
              <td>release year</td>
              <td>play count</td>
            </tr>
          </thead>
          <tbody>
            {this.renderSongRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
