import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Home from '../../containers/Home/Home.jsx';

/**
 * The root component of React
 * Should add Route element here for new-added components
 */
class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Route exact path={"/"} component={Home}/>
            </div>
        </Router>
    );
  }
}

export default App;
