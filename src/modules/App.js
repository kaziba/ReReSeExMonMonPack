import React from 'react';
import { Link } from 'react-router';
import Home from './Home';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Krima Syaro</h1>
        <ul role="nav">
          <li><Link to="/comment"  activeClassName="active">Comment</Link></li>
          <li>About</li>
          <ul>
            <li><Link to="/about/KirimaSyaro" activeClassName="active">About/KirimaSyaro</Link></li>
            <li><Link to="/about/TedezaRize" activeClassName="active">About/TedezaRize</Link></li>
          </ul>
          <li><Link to="/repos" activeClassName="active">Repos</Link></li>
        </ul>
        {this.props.children || <Home />}
      </div>
    );
  }
};
