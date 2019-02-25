import React, { Component } from 'react';
import TopBar from '../components/TopBar.js';
import TransformersListItems from '../components/TransformersListItems.js';

class OverviewPage extends Component {

  render() {

    if(this.props.location.state) {
      let newListItem = this.props.location.state;
      if(!containsSameName(newListItem, this.props.transformers)) {
        this.props.transformers.push(newListItem);
      }

      function containsSameName (newItem, transformers) {
        let sameNames = transformers.filter(transformer => transformer.name === newItem.name);
        return Boolean(sameNames.toString())
      }
    }

    return (
      <div className="container">

        <h1>Transformers Overview</h1>
        <hr />

        <TopBar factions={this.props.factions} />
        <hr />
        <TransformersListItems
          transformers={this.props.transformers}
          updateStatus={this.updateStatus}
        />

      </div>
    );
  }

}

export default OverviewPage;
