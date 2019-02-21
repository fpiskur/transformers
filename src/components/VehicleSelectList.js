import React, { Component } from 'react';

class VehicleSelectList extends Component {



  render() {
    return (
      <div className="col-12 col-md-3">
        <label htmlFor={this.props.htmlId}>{ this.props.dropDownLabel }</label>
        <select className="form-control custom-select" id={this.props.htmlId} onChange={this.handleGroupChange}>
          <option hidden disabled selected value> -- {this.prop.dropDownPlaceholder} -- </option>
          {this.props.optionsList.map(group => (
            <option key={group.toString()} value={group}>{ group }</option>
          ))};
        </select>
      </div>
    );
  }

}

export default VehicleSelectList;
