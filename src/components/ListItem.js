import React, { Component } from 'react';
import Faction from './Faction.js';

class ListItem extends Component {

  state = {
    transformers: [],
    isLoaded: false
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/db')
      .then(res => res.json())
      .then(json => {
        this.setState({
          transformers: json.transformers,
          isLoaded: true
        })
      });
  }

  render() {

    let { isLoaded, transformers } = this.state;

    if(!isLoaded) {
      return null;
    } else {
      return (
        transformers.map(transformer => (
          <div className="row">
            <Faction/>
            <div className="col-md-8">
              <span key={transformer.id}>
                {transformer.name}
              </span>
            </div>
          </div>
        ))
      );
    }
  }

}

export default ListItem;
