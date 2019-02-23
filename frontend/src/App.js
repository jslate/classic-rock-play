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

  render() {
    return (
      <div className="App">
        <h1>Songs</h1>
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
