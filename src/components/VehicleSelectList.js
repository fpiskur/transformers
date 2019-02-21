import React, { Component } from 'react';

class VehicleSelectList extends Component {

  render() {
    return (
      <div className="col-12 col-md-3">
        <select className="form-control custom-select" onChange={this.props.method} disabled={this.props.disabled}>
          <option hidden disabled selected value>{this.props.dropDownPlaceholder}</option>
          {this.props.optionsList.map(group => (
            <option key={group.toString()} value={group}>{ group }</option>
          ))};
        </select>
      </div>
    );
  }

}

export default VehicleSelectList;
