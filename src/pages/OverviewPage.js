import React, { Component } from 'react';
import TopBar from '../components/TopBar.js';
import TransformersListItems from '../components/TransformersListItems.js';

class OverviewPage extends Component {

  render() {

      return (
        <div className="container">

          <h1>Transformers Overview</h1>
          <hr />

          <TopBar factions={this.props.factions} />
          <hr />
          <TransformersListItems transformers={this.props.transformers} />

        </div>
      );
  }

}

export default OverviewPage;
