import React from 'react';
import { Link } from 'react-router';
import Home from './Home';
import style from './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <h1 className={style.brand}>Krima Syaro</h1>
          <ul role="nav">
            <li className={style.item}><Link to="/comment"  className={style.link} activeClassName="active">Comment</Link></li>
            <li className={style.item}><Link to="/about/KirimaSyaro" className={style.link} activeClassName="active">About/KirimaSyaro</Link></li>
            <li className={style.item}><Link to="/about/TedezaRize" className={style.link} activeClassName="active">About/TedezaRize</Link></li>

            <li className={style.item}><Link to="/repos" className={style.link} activeClassName="active">Repos</Link></li>
          </ul>
        </nav>
        <div className={style.container}>
          {this.props.children || <Home />}
        </div>
      </header>
    );
  }
}
