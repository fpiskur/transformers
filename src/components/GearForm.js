import React, { Component } from 'react';
import Gear from '../components/Gear.js';

class GearForm extends Component {

  state = {
    gear: this.props.gear
  }  

  handleEnterKey = (e) => {
    let code = e.keyCode || e.which;
    if(code === 13) {
      e.preventDefault();
      this.addGearItems();
    }
  }

  addGearItems = (e) => {
    let newItems = document.getElementById('gear').value.trim();
    if(newItems) {
      newItems = newItems.split(/,\s*/);
      this.props.addGearItems(newItems);
      document.getElementById('gear').value = '';
    }
  }

  render() {
    
    return (
      <div className="row form-group">
        <div className="col-12 col-md-2">
          <label htmlFor="gear">Gear:</label>
        </div>
        <div className="col-12 col-md-4 mb-1">
          <Gear gear={this.props.gear} deleteGearItem={this.props.deleteGearItem} />
        </div>

        <div className="w-100"></div>

        <div className="col-9 col-md-4 offset-md-2">
          <input type="text" className="form-control" id="gear" onKeyPress={this.handleEnterKey} placeholder="Enter gear item"/>
        </div>
        <div className="col-3 col-md-1">
          <button type="button" className="btn btn-primary" onClick={this.addGearItems}>Add</button>
        </div>
      </div>
    );

  }

}

export default GearForm;
