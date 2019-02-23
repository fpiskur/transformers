import React, { Component } from 'react';

class Gear extends Component {

  state = {
    gear: this.props.gear
  }

  render() {

    let { gear } = this.state;

    if (gear) {
      return (
        <div>
          {gear.map(item => (
            <span key={item} className="badge badge-pill badge-secondary mr-1">{item}
              <button type="button" className="btn btn-link ml-1 p-0 text-white" style={{ lineHeight: 1, textDecoration: 'none' }}>&times;</button>
            </span>
          ))}
        </div>
      );
    } else {
      return (
        <div><span className="text-muted">Inventory empty</span></div>
      );
    }

  }

}

export default Gear;
