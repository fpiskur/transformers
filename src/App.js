import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Overview from './pages/Overview.js';
import AddNew from './pages/AddNew.js';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Overview}/>
          <Route path="/add-new" component={AddNew}/>
        </div>
      </Router>
    );
  }

}

export default App;
