import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OverviewPage from './pages/OverviewPage.js';
import AddNewPage from './pages/AddNewPage.js';
import EditPage from './pages/EditPage.js';

class App extends Component {

  state = {
    isLoaded: false,
    factions: [],
    vehicleTypes: [],
    transformers: []
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/db')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          factions: json.factions,
          vehicleTypes: json.vehicleTypes,
          transformers: json.transformers
        })
      });
  }

  render() {
    let {isLoaded, factions, vehicleTypes, transformers} = this.state;

    if(!isLoaded) {
      return <div className="text-center" style={{ marginTop: 'calc(100vh / 2 - 3em)' }}>Loading...</div>
    } else {
      return (
        <Router>
          <div className="mt-4">
            <Route exact path="/" component={() => (
              <OverviewPage factions={factions} transformers={transformers} />
            )} />
            <Route exact path="/add-new" component={() => (
              <AddNewPage factions={factions} vehicleTypes={vehicleTypes} />
            )} />
            <Route exact path="/edit" render={(props) => (
              <EditPage {...props} factions={factions} vehicleTypes={vehicleTypes} />
            )} />
          </div>
        </Router>
      );
    }
  }

}

export default App;
