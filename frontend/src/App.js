import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {songs: []}

  componentDidMount() {
    fetch('/songs')
      .then(res => res.json())
      .then(songs => {
        console.log(songs);
        this.setState({ songs: JSON.parse(songs) });
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
  renderSongCirles = () => {
    if (typeof(this.state.songs.map) == 'function') {
      return this.state.songs.map((song, index) => {
       const y = (index % 8) * 20 + 20;
       const color = song.artist == 'Led Zeppelin' ? 'red' : 'blue';
        return (
          <g key={song.id}>
            <circle cx={(song.release_year - 1965) * 10} cy={y} r={song.play_count/6} fill={color} fillOpacity="0.5" />
            <text x={(song.release_year - 1965) * 10} y={y} textAnchor="middle" fontSize="4">{song.name}</text>
            <text x={(song.release_year - 1965) * 10} y={y + 5} textAnchor="middle" fontSize="4">{song.release_year}</text>
          </g>
        )
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Songs</h1>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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
