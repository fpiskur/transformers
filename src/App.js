import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OverviewPage from './pages/OverviewPage.js';
import AddNewPage from './pages/AddNewPage.js';
import EditPage from './pages/EditPage.js';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={OverviewPage} />
          <Route exact path="/add-new" component={AddNewPage} />
          <Route exact path="/edit" component={EditPage} />
        </div>
      </Router>
    );
  }

}

export default App;
