import React, { Component } from 'react';

class ArtistAddForm extends Component {
  render() {
    return (
      <form onSubmit={(event) => {
         event.preventDefault();
         const textField = event.target.children[0];
         this.props.onAddArtist(textField.value);
         textField.value = '';
         textField.focus();
      }}>
        <input type="text" name="artist"  disabled={this.props.disabled} defaultValue="Led Zeppelin" />
        <input type="submit" value="Add" disabled={this.props.disabled} />
      </form>
    );
  }
}

export default ArtistAddForm;
