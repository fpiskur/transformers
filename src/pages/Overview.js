import React, { Component } from 'react';
import TopBar from '../components/TopBar.js';
import ListItem from '../components/ListItem.js';
import './Overview.css';

class Overview extends Component {

  render() {

      return (
        <div className="container">

          <h1>Transformers Overview</h1>
          <hr/>

          <TopBar />

          <ListItem />

        </div>
      );
  }

}

export default Overview;
