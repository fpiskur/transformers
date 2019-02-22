import React, { Component } from 'react';
import TopBar from '../components/TopBar.js';
import TransformersListItems from '../components/TransformersListItems.js';
import './Overview.css';

class Overview extends Component {

  render() {

      return (
        <div className="container">

          <h1>Transformers Overview</h1>
          <hr />

          <TopBar />
          <hr />
          <TransformersListItems />

        </div>
      );
  }

}

export default Overview;
