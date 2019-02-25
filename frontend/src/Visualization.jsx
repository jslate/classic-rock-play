import React, { Component } from 'react';
import SvgGradients from './SvgGradients';

class Visualization extends Component {

  showCoordinates = false;

  state = {
    windowHeight: undefined,
    windowWidth: undefined
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  width = 200;
  addFormHeight = 63;

  elipsify = (string, maxLength) => (
    string.length > maxLength ? `${string.slice(0,maxLength)}…` : string
  )

  yHeight = () => this.width * ((this.state.windowHeight - this.addFormHeight) / this.state.windowWidth) - 10;
  // xWidth = () => this.width - 20

  firstReleaseYear = () => Math.min(...this.props.songs.map((song) => song.release_year));
  lastReleaseYear = () => Math.max(...this.props.songs.map((song) => song.release_year));

  songCountForYear = (year) => this.props.songs.filter((song) => song.release_year === year).length;

  renderXCoordinates = () => {
    if (!this.showCoordinates) { return; }
    let position = 0;
    const positions = [];
    while (position < 200) {
      positions.push(position);
      position += 5;
    }
    return positions.map((position) => (
      <text
        key={position}
        x={position}
        y={1.5}
        fontSize={2}
        fill="black"
      >
        {position}
      </text>
    ))
  }

  renderYCoordinates = () => {
    if (!this.showCoordinates) { return; }
    let position = 0;
    const positions = [];
    while (position < this.yHeight()) {
      positions.push(position);
      position += 5;
    }
    return positions.map((position) => (
      <text
        key={position}
        x={0}
        y={position}
        fontSize={2}
        fill="black"
      >
        {position}
      </text>
    ))
  }

  renderSongCirles = () => {
    return this.props.songs.map((song, index) => {
      const horizontalBuffer = 20;
      const songCount = this.songCountForYear(song.release_year);
      const songHeight = Math.round(this.yHeight() / songCount);
      const yOffset = Math.round(songHeight / 2);
      const surroundingYearCount = this.songCountForYear(song.release_year - 1) + this.songCountForYear(song.release_year + 1)
      const columnSpecificYOffset = Math.round(surroundingYearCount > 0 && song.release_year % 2 === 0 ? yOffset / 4 : 0);
      const y = (index % songCount) * songHeight + yOffset + columnSpecificYOffset;
      const years = this.lastReleaseYear() - this.firstReleaseYear() + 1;
      const yearWidth = (this.width - horizontalBuffer) / years;
      const songYear = song.release_year - this.firstReleaseYear();
      const x = songYear * yearWidth + yearWidth / 2 + horizontalBuffer / 2;
      const fontSize = 300/(this.width - song.play_count);
      return (
        <g key={song.id}>
          <circle
            cx={x}
            cy={y}
            r={song.play_count/6}
            className={song.artist.color}
            fillOpacity="0.6"
           />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={fontSize}
            fill="black"
          >
            {this.elipsify(song.name, 16)}
          </text>
          <text
            x={x}
            y={y + fontSize * 1.5}
            textAnchor="middle"
            fontSize={fontSize}
            fill="black"
          >
            {song.release_year}
          </text>
        </g>
      )
    });
  }

  render = () => (
    <svg className="visualization" viewBox={`0 0 200 ${this.yHeight()}`} xmlns="http://www.w3.org/2000/svg">
      <SvgGradients />
      {this.renderXCoordinates()}
      {this.renderYCoordinates()}
      {this.renderSongCirles()}
    </svg>
  )
}

export default Visualization;
