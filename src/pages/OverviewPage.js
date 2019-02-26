import React, { Component } from 'react';
import TopBar from '../components/TopBar.js';
import TransformersListItems from '../components/TransformersListItems.js';

class OverviewPage extends Component {

  state = {
    transformers: this.props.transformers,
    notFound: false
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
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ transformers: [...props.transformers] });
    // this.forceUpdate();
  }

  filterList = (faction) => {
    let outputList = this.props.transformers.filter(transformer => transformer.faction === faction);
    if(outputList[0]) {
      this.setState({ transformers: [...outputList] });
    } else {
      this.setState({ transformers: [...this.props.transformers] })
    }
  }

  handleSearch = (searchTerm) => {
    let outputList = this.props.transformers.filter(transformer => transformer.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    if(outputList[0] ) {
      this.setState({ transformers: [...outputList], notFound: false });
    } else if (!outputList[0] && !searchTerm) {
      this.setState({ transformers: [...this.props.transformers], notFound: false });
    } else {
      this.setState({ notFound: true });
    }
  }

  sameId (newTransformer, transformers) {
    let sameIds = transformers.filter(transformer => transformer.id == newTransformer.id);
    return Boolean(sameIds.toString())
  }

  render() {

    return (
      <div className="container">

        <h1>Transformers Overview</h1>
        <hr />

        <TopBar
          factions={this.props.factions}
          filterList={this.filterList}
          handleSearch={this.handleSearch}
        />
        <hr className="mb-0" />
        <TransformersListItems
          transformers={this.state.transformers}
          updateStatus={this.updateStatus}
          notFound={this.state.notFound}
        />

      </div>
    );
  }

}

export default OverviewPage;
