import React, { Component } from 'react';
import './AddNew.css';

class AddNew extends Component {

  state = {
    isLoaded: false,
    factions: [],
    vehicleTypes: [],
    selectedVehicleGroup: "",
    selectedVehicleTypes: [],
    selectedVehicleModels: []
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/db')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          factions: json.factions,
          vehicleTypes: json.vehicleTypes
        })
      });
  }


  handleGroupChange = (e) => {
    let {value} = e.target;
    let selectedVehicleTypes = this.state.vehicleTypes.filter(selectedType => selectedType.group == value)
                                           .map(vehicle => vehicle.type);

    this.setState({ selectedVehicleGroup: value, selectedVehicleTypes: selectedVehicleTypes });
  }

  render() {
    let { isLoaded, factions, vehicleTypes } = this.state;
    const distinctVehicleGroups = [...new Set(vehicleTypes.map(type => type.group))];

    if(!isLoaded) {
      return null;
    } else {
      return (
        <div className="container">

          <h1>Add New Transformer</h1>
          <hr/>

          <form>

            <div className="row form-group">
              <div className="col-12 col-md-2">
                <label htmlFor="name">Name:</label>
              </div>
              <div className="col-12 col-md-4 mb-3 mb-md-0">
                <input type="text" className="form-control" id="name" placeholder="Enter name"/>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="status">Status:</label>
              </div>
              <div className="col-12 col-md-2">
                <select className="form-control custom-select" id="status">
                  <option value="OK">OK</option>
                  <option value="INJURED">INJURED</option>
                  <option value="MIA">MIA</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-12 col-md-2">
                <label htmlFor="faction">Faction:</label>
              </div>
              <div className="col-12 col-md-4">
                <select className="form-control custom-select" id="faction">
                  <option hidden disabled selected value> -- choose faction -- </option>
                  {factions.map(faction => (
                    <option key={faction.id} value={faction.name}>{ faction.name }</option>
                  ))};
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-12 col-md-2">
                <label htmlFor="gear">Gear:</label>
              </div>
              <div className="col-9 col-md-4 mb-1">
                <input type="text" className="form-control" id="gear" placeholder="Enter gear"/>
              </div>
              <div className="col-3 col-md-1">
                <button type="button" className="btn btn-primary">Add</button>
              </div>
              <div className="w-100"></div>
              <div className="col-12 col-md-4 offset-md-2">
                <div id="added-gear"></div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <fieldset className="w-100">
                  <div className="row form-group">
                    <div className="col-12">
                      <legend>Vehicle properties</legend>
                    </div>

                    <div className="col-12 col-md-3">
                      <label htmlFor="vehicle-group">Vehicle group:</label>
                      <select className="form-control custom-select" id="vehicle-group" onChange={this.handleGroupChange}>
                        <option hidden disabled selected value> -- vehicle group -- </option>
                        {distinctVehicleGroups.map(group => (
                          <option key={group.toString()} value={group}>{ group }</option>
                        ))};
                      </select>
                    </div>

                    <div className="col-12 col-md-3">
                      <label htmlFor="vehicle-type">Vehicle type:</label>
                      <select className="form-control custom-select" id="vehicle-type">
                        {this.state.selectedVehicleTypes.map(type => (
                          <option key={type.toString()} value={type}>{ type }</option>
                        ))};
                      </select>
                    </div>

                    <div className="col-12 col-md-3">
                      <label htmlFor="vehicle-model">Vehicle model:</label>
                      <select className="form-control custom-select" id="vehicle-model" disabled>
                        {vehicleTypes.map(faction => (
                          <option key={faction.id} value="">{ faction.name }</option>
                        ))};
                      </select>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="row">
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary btn-lg">Add Transformer</button>
              </div>
            </div>

          </form>

        </div>
      );
    }
  }

}

export default AddNew;
