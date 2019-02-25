import React, { Component } from 'react';
import TopBar from '../components/TopBar.js';
import TransformersListItems from '../components/TransformersListItems.js';

class OverviewPage extends Component {

  state = {
    transformers: this.props.transformers
  }

  componentWillMount() {
    if(this.props.location.state) {
      let listItem = {...this.props.location.state};
      let transformers = [...this.props.transformers];
      if(!this.sameId(listItem, transformers)) {
        transformers.push(listItem);
      } else {
        transformers[listItem.id] = listItem;
      }
      this.props.updateTransformersList(transformers);
      // this.updateListState(transformers)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ transformers: [...props.transformers], shouldUpdate: true });
  }

  sameId (newItem, transformers) {
    let sameIds = transformers.filter(transformer => transformer.id == newItem.id);
    return Boolean(sameIds.toString())
  }

  render() {

    return (
      <div className="container">

        <h1>Transformers Overview</h1>
        <hr />

        <TopBar factions={this.props.factions} />
        <hr />
        <TransformersListItems
          transformers={this.state.transformers}
          updateStatus={this.updateStatus}
        />

      </div>
    );
  }

}

export default OverviewPage;
