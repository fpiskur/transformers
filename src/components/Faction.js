import React, { Component } from 'react';

class Faction extends Component {

  state = {
    isLoaded: false,
    factions: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/db')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          factions: json.factions
        })
      });
  }

  render() {

    let { isLoaded, factions } = this.state;

    if(!isLoaded) {
      return null;
    } else {
      return (
        factions.map(faction => (
          <div className="col-md-2">
            <span key={faction.id}>
              {faction.name}
            </span>
          </div>
        ))
      );
    }
  }

}

export default Faction;
