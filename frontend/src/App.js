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

  elipsify = (string, maxLength) => (
    string.length > maxLength ? `${string.slice(0,maxLength)}…` : string
  )

  renderSongCirles = () => {
    if (typeof(this.state.songs.map) == 'function') {
      return this.state.songs.map((song, index) => {
       const y = (index % 6) * 20 + 30;
       const color = song.artist == 'Led Zeppelin' ? 'red' : 'yellow';
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
  }

  render() {
    return (
      <div className="App">
        <h1>Songs</h1>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="yellowGradient">
              <stop offset="5%" stop-color="#f7da74" />
              <stop offset="95%" stop-color="#af8c0e" />
            </linearGradient>
            <linearGradient id="redGradient">
              <stop offset="5%" stop-color="#F00" />
              <stop offset="95%" stop-color="#F77" />
            </linearGradient>
            <linearGradient id="blueGradient">
              <stop offset="5%" stop-color="#00F" />
              <stop offset="95%" stop-color="#66F" />
            </linearGradient>
          </defs>
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
