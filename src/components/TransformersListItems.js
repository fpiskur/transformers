import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TransformerStatus from './TransformerStatus.js';
import autobotsLogo from '../images/autobots-logo.png';
import decepticonsLogo from '../images/decepticons-logo.png';

class TransformersListItems extends Component {

  render() {

    let { transformers } = this.props;
    let logo = {
      'Autobots': autobotsLogo,
      'Decepticons': decepticonsLogo
    };

    return (
      transformers.map(transformer => (
        <div key={transformer.id} className="row mb-1">
          <div className="col-md-1">
            <img
              src={logo[transformer.faction]}
              style={{ width: '20px', height: '20px' }}
              data-toggle="tooltip"
              title={transformer.faction}
              alt={transformer.faction}
            />
          </div>

          <div className="col-md-2">
            <TransformerStatus
            id={transformer.id}
            status={transformer.status}
            // updateStatus={this.updateStatus}
          />
          </div>

          <div className="col-md-8">
            <div>{transformer.name}</div>
            <div style={{ lineHeight: 1 }}>
              <small className="text-muted">
                { transformer.vehicleGroup } / { transformer.vehicleType } / { transformer.vehicleModel }
              </small>
            </div>
            <div style={{ lineHeight: 1 }}>
              <small className="text-muted"> gear:  
                {transformer.gear ? transformer.gear.join(', ') : <span>Inventory empty</span>}
              </small>
            </div>
          </div>

          <div className="col-md-1">
            <div className="d-flex justify-content-end">
              <Link type="button" className="btn btn-outline-secondary" to={`edit/${transformer.id}`}>Edit</Link>
            </div>
          </div>
        </div>
      ))
    );

  }

}

export default TransformersListItems;
