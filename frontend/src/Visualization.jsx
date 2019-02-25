import React, { Component } from 'react';
import SvgGradients from './SvgGradients';

class Visualization extends Component {
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

  yHeight = () => this.width * ((this.state.windowHeight - this.addFormHeight) / this.state.windowWidth);

  firstReleaseYear = () => Math.min(...this.props.songs.map((song) => song.release_year));
  lastReleaseYear = () => Math.max(...this.props.songs.map((song) => song.release_year));

  songCountForYear = (year) => this.props.songs.filter((song) => song.release_year === year).length;

  renderSongCirles = () => {
    return this.props.songs.map((song, index) => {
     const songCount = this.songCountForYear(song.release_year);
     const y = (index % songCount) * (this.yHeight() / songCount) + (this.yHeight() / songCount / 2) + (song.release_year % 2 === 0 ? 50 : 0);
     const years = this.lastReleaseYear() - this.firstReleaseYear();
     const x = (song.release_year - this.firstReleaseYear()) * (168 / years) + 16;
     const fontSize = 300/(200 - song.play_count);
     // debugger;
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
      {this.renderSongCirles()}
    </svg>
  )
}

export default Visualization;
