import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/Footer.css';

export default class Footer extends Component {
  render() {
    const date = new Date();
    return(
      <div className="footer">
        
        <p>Designed and maintained by <a href="https://zak.su">Zak</a></p>
        <p>It's a hobby project, non-commercial purposes</p>
        <p>{date.getFullYear()}</p>
      </div>
    )
  }
}


