import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TransformerStatus from './TransformerStatus.js';
import './TransformersListItems.css';
import autobotsLogo from '../images/autobots-logo.png';
import decepticonsLogo from '../images/decepticons-logo.png';

class TransformersListItems extends Component {

  state = {
    transformers: [],
    vehicles: [],
    factions: [],
    isLoaded: false
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/db')
      .then(res => res.json())
      .then(json => {
        this.setState({
          transformers: json.transformers,
          vehicles: json.vehicleTypes,
          factions: json.factions,
          isLoaded: true
        })
      });
  }

  render() {

    let { isLoaded, transformers, vehicles, factions } = this.state;
    let logo = {
      'Autobots': autobotsLogo,
      'Decepticons': decepticonsLogo
    };

    if(!isLoaded) {
      return null;
    } else {
      return (
        transformers.map(transformer => (
          <div key={transformer.id} className="row mb-1">
            <div className="col-md-1">
              <img
                src={logo[transformer.faction]}
                className="transformer-logo"
                data-toggle="tooltip"
                title={transformer.faction}
                alt={transformer.faction}
              />
            </div>

            <div className="col-md-2">
              <TransformerStatus status={transformer.status} />
            </div>

            <div className="col-md-8">
              <div>{transformer.name}</div>
              <div style={{ lineHeight: 1 }}>
                <small className="text-muted">
                  { transformer.vehicleGroup } / { transformer.vehicleType } / { transformer.vehicleModel }
                </small>
              </div>
              <div style={{ lineHeight: 1 }}>
                <small className="text-muted">
                  gear: { transformer.gear.join(', ') }
                </small>
              </div>
            </div>

            <div className="col-md-1">
              <div className="d-flex justify-content-end">
                <Link type="button" className="btn btn-outline-secondary"
                  to={{
                    pathname: '/edit',
                    transformer: transformer,
                    vehicles: vehicles,
                    factions: factions
                  }}>
                Edit</Link>
              </div>
            </div>
          </div>
        ))
      );
    }
  }

}

export default TransformersListItems;
