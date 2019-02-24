import React from 'react';

const SvgGradients = ({ checked, label, handleClick }) => (
  <defs>
    <linearGradient id="yellowGradient">
      <stop offset="5%" stopColor="#f7da74" />
      <stop offset="95%" stopColor="#af8c0e" />
    </linearGradient>
    <linearGradient id="redGradient">
      <stop offset="5%" stopColor="#F00" />
      <stop offset="95%" stopColor="#F77" />
    </linearGradient>
    <linearGradient id="blueGradient">
      <stop offset="5%" stopColor="#00F" />
      <stop offset="95%" stopColor="#66F" />
    </linearGradient>
    <linearGradient id="greenGradient">
      <stop offset="5%" stopColor="#018e2b" />
      <stop offset="95%" stopColor="#09421a" />
    </linearGradient>
  </defs>
);

export default SvgGradients;
