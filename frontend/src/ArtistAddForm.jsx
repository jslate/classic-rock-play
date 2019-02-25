import React, { Component } from 'react';

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

  render = () => (
    <form onSubmit={(event) => {
       event.preventDefault();
       const textField = event.target.getElementsByTagName('input')[0];
       this.props.onAddArtist(textField.value);
       textField.value = '';
       textField.focus();
    }}>
      <datalist id="allArtists">
        {this.state.allArtists.map((artist) => <option key={artist}>{artist}</option>)}
      </datalist>
      <input
        type="text"
        name="artist"
        list="allArtists"
        onChange={(event) => this.setState({ value: event.target.value })}
        autoComplete="off"
        disabled={this.props.disabled}
      />
      <input type="submit" value="Add" disabled={this.props.disabled} />
    </form>
  );
}

export default ArtistAddForm;
