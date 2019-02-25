import React, { Component } from 'react';
import SvgGradients from './SvgGradients';

class Visualization extends Component {
  elipsify = (string, maxLength) => (
    string.length > maxLength ? `${string.slice(0,maxLength)}…` : string
  )

  renderSongCirles = () => {
    return this.props.songs.map((song, index) => {
     const y = (index % 6) * 20 + 30;
     const fontSize = 300/(200 - song.play_count);
     return (
       <g key={song.id}>
         <circle
           cx={(song.release_year - 1965) * 10}
           cy={y}
           r={song.play_count/6}
           className={song.artist.color}
           fillOpacity="0.6"
          />
         <text
           x={(song.release_year - 1965) * 10}
           y={y}
           textAnchor="middle"
           fontSize={fontSize}
           fill="black"
         >
           {this.elipsify(song.name, 20)}
         </text>
         <text
           x={(song.release_year - 1965) * 10}
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
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <SvgGradients />
      {this.renderSongCirles()}
    </svg>
  )
}

export default Visualization;
