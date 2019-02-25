import React, { Component } from 'react';

class SongTable extends Component {
  renderSongRows = () => (
    this.props.songs.map(song =>
      <tr key={song.id}>
        <td>{song.name}</td>
        <td>{song.artist.name}</td>
        <td>{song.release_year}</td>
        <td>{song.play_count}</td>
      </tr>
    )
  )

  render = () => (
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
  )
}

export default SongTable;
