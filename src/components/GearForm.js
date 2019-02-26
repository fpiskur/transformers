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
          <div className="col-12 col-md-3">
            <label htmlFor="gear">Gear:</label>
          </div>
          <div className="col-12 col-md-9 mb-1">
            <Gear gear={this.props.gear} deleteGearItem={this.props.deleteGearItem} />
          </div>

          <div className="w-100"></div>

          <div className="col-12 col-md-9 offset-md-3">
            <div className="input-group">
              <input type="text" className="form-control" id="gear" onKeyPress={this.handleEnterKey} placeholder="Enter gear item"/>
              <div className="input-group-append">
                <button type="button" className="btn btn-primary" onClick={this.addGearItems}>Add</button>
              </div>
            </div>
          </div>
        </div>
    );

  }

}

export default GearForm;
