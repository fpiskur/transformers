import React, { Component } from 'react';
import Gear from '../components/Gear.js';

class GearForm extends Component {

  state = {
    gear: this.props.gear
  }

  deleteGearItem = (index) => {
    this.setState(state => ({ gear: state.gear.filter(item => state.gear.indexOf(item) !== index) }));
  }

  addGearItem = () => {
    let newItem = document.getElementById('gear').value.trim();
    if(newItem) {
      newItem = newItem.split(/,\s*/);
      let uniqueList = [...new Set(this.state.gear.concat(newItem))]
      this.setState(state => ({ gear: uniqueList }));
      document.getElementById('gear').value = '';
    }
  }

  handleEnterKey = (e) => {
    let code = e.keyCode || e.which;
    if(code === 13) {
      e.preventDefault();
      this.addGearItem();
    }
  }

  render() {
    
    return (
      <div className="row form-group">
        <div className="col-12 col-md-2">
          <label htmlFor="gear">Gear:</label>
        </div>
        <div className="col-12 col-md-4 mb-1">
          <Gear gear={this.state.gear} deleteGearItem={this.deleteGearItem} />
        </div>

        <div className="w-100"></div>

        <div className="col-9 col-md-4 offset-md-2">
          <input type="text" className="form-control" id="gear" onKeyPress={this.handleEnterKey} placeholder="Enter gear item"/>
        </div>
        <div className="col-3 col-md-1">
          <button type="button" className="btn btn-primary" onClick={this.addGearItem}>Add</button>
        </div>
      </div>
    );

  }

}

export default GearForm;
