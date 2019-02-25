import React, { Component } from 'react';
import ArtistList from './ArtistList';
import SongTable from './SongTable';
import Visualization from './Visualization';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.addArtist('Black Sabbath');
  }

  colors = ['red', 'yellow', 'blue', 'green'];

  state = {
    songs: [],
    artists: [],
  }

  fetchSongs = () => {
    fetch(`/songs?artists=${this.state.artists.map((artist) => artist.name).join(',')}`)
      .then(res => res.json())
      .then(songs => {
        this.setState({
          songs: JSON.parse(songs).map((song) => {
            return { ...song, artist: this.state.artists.find((artist) => artist.name === song.artist) };
        }),
      });
    });
  }

  removeArtist = (name) => {
    this.setState({ artists: this.state.artists.filter((a) => a.name !== name)}, this.fetchSongs);
  }

  addArtist = (name) => {
    this.setState({ artists: [...this.state.artists, { name: name, color: this.colors[this.state.artists.length]}]}, () => {
      this.fetchSongs();
    });
  }

  render = () => (
    <div className="App">
      <ArtistList
        artists={this.state.artists}
        onRemoveArtist={this.removeArtist}
        onAddArtist={this.addArtist}
        haveMaxArtists={this.state.artists.length >= this.colors.length}
      />
      <Visualization songs={this.state.songs} />
      <SongTable songs={this.state.songs} />
    </div>
  );
}

export default App;
