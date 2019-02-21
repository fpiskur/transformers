import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Overview from './pages/Overview.js';

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Overview}/>
      </Router>
    );
  }

}

export default App;
