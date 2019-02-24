import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class ArtistAddForm extends Component {

  state = {
    allArtists: [],
  };

  componentDidMount() {
    fetch('/songs/artists')
      .then((res) => res.json())
      .then((data) => this.setState({ allArtists: JSON.parse(data) }))
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <form onSubmit={(event) => {
         event.preventDefault();
         const textField = event.target.children[0];
         this.props.onAddArtist(this.state.value);
         this.setState({ value: '' });
         textField.focus();
      }}>
        <datalist id="allArtists">
          {this.state.allArtists.map((artist) => <option>{artist.artist}</option>)}
        </datalist>
        <input type="text" name="artist" list="allArtists" value={this.state.value} onChange={(event) => this.setState({ value: event.target.value })} autocomplete="off" disabled={this.props.disabled} />
        <input type="submit" value="Add" disabled={this.props.disabled} />
      </form>
    );
  }
}

export default ArtistAddForm;
