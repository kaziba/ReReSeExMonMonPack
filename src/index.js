import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Link, Router, Route, browserHistory } from 'react-router';
import App from './modules/App';
import Home from './modules/Home';
import Comment from './modules/Comment';
import About from './modules/About';
import Repos from './modules/Repos';
import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/comment" component={Comment}/>
      <Route path="/repos" component={Repos}/>
      <Route path="/about/:name" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'));
