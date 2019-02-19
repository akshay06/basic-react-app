
import React from 'react';
// import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Test from './components/Test/Test';

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/test">Test</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/test" component={Test} />
    </div>
  </Router>
);

App.propTypes = {
};

App.defaultProps = {
};

export default hot(module)(App);
