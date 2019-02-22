import React, { Component } from 'react';
import VehicleSelectList from '../components/VehicleSelectList.js';
import Gear from '../components/Gear.js';

class Edit extends Component {

  state = {
    factions: this.props.location.factions,
    vehicles: this.props.location.vehicles,
    availableVehicleTypes: [],
    availableVehicleModels: [],
    typesDisabled: false,
    modelsDisabled: false,
    name: this.props.location.transformer.name,
    status: this.props.location.transformer.status,
    faction: this.props.location.transformer.faction,
    gear: this.props.location.transformer.gear,
    vehicleGroup: this.props.location.transformer.vehicleGroup,
    vehicleType: this.props.location.transformer.vehicleType,
    vehicleModel: this.props.location.transformer.vehicleModel
  }

  componentWillMount() {
    let availableVehicleTypes = this.getUniqueVehicleTypes(this.props.location.transformer.vehicleGroup);
    let availableVehicleModels = this.getUniqueVehicleModels(this.props.location.transformer.vehicleType);
    this.setState({ availableVehicleTypes: availableVehicleTypes, availableVehicleModels: availableVehicleModels });
  }

  getUniqueVehicleTypes(vehicleGroup) {
    let allGroupTypes = this.state.vehicles.filter(selectedType => selectedType.group === vehicleGroup)
                                           .map(vehicle => vehicle.type);
    return [...new Set(allGroupTypes)];
  }

  getUniqueVehicleModels(vehicleType) {
    return this.state.vehicles.filter(selectedModel => selectedModel.type === vehicleType)
                              .map(vehicle => vehicle.model);
  }

  handleGroupChange = (e) => {
    let {value} = e.target;
    let uniqueVehicleTypes = this.getUniqueVehicleTypes(value);

    this.setState({ availableVehicleTypes: uniqueVehicleTypes, typesDisabled: false });
  }

  handleTypeChange = (e) => {
    let {value} = e.target;
    let vehicleModels = this.state.vehicles.filter(selectedModel => selectedModel.type === value)
                                           .map(vehicle => vehicle.model);

    this.setState({ availableVehicleModels: vehicleModels, modelsDisabled: false });
  }

  handleStatusChange = (e) => {
    let {value} = e.target;
    this.setState({ status: value });
  }

  handleNameChange = (e) => {
    let {value} = e.target;
    this.setState({ name: value });
  }

  handleFactionChange = (e) => {
    let {value} = e.target;
    this.setState({ faction: value });
  }

  render() {
    let { isLoaded, factions, vehicles } = this.state;
    const uniqueVehicleGroups = [...new Set(vehicles.map(vehicle => vehicle.group))];

    return (
      <div className="container">

        <h1>Edit Transformer</h1>
        <hr/>

        <form>

          <div className="row form-group">
            <div className="col-12 col-md-2">
              <label htmlFor="name">Name:</label>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <input type="text" className="form-control" id="name" placeholder="Enter name" value={this.state.name} onChange={this.handleNameChange} />
            </div>
            <div className="col-12 col-md-2">
              <label htmlFor="status">Status:</label>
            </div>
            <div className="col-12 col-md-2">
              <select className="form-control custom-select" id="status" value={this.state.status} onChange={this.handleStatusChange}>
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
              <select className="form-control custom-select" id="faction" value={this.state.faction} onChange={this.handleFactionChange}>
                <option hidden disabled value="placeholder"> -- choose faction -- </option>
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
              <input type="text" className="form-control" id="gear" placeholder="Enter gear item"/>
            </div>

            <div className="col-3 col-md-1">
              <button type="button" className="btn btn-primary">Add</button>
            </div>

            <div className="w-100"></div>

            <div className="col-12 col-md-4 offset-md-2">
              <Gear gear={this.state.gear} />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <fieldset className="w-100">
                <div className="row form-group">
                  <div className="col-12">
                    <legend>Vehicle properties</legend>
                  </div>

                  <VehicleSelectList
                    dropDownPlaceholder = " -- vehicle group -- "
                    optionsList = {uniqueVehicleGroups}
                    disabled = {false}
                    method = {this.handleGroupChange}
                    default = {this.state.vehicleGroup}
                  />

                  <VehicleSelectList
                    dropDownPlaceholder = " -- vehicle type -- "
                    optionsList = {this.state.availableVehicleTypes}
                    disabled = {this.state.typesDisabled}
                    method = {this.handleTypeChange}
                    default = {this.state.vehicleType}
                  />

                  <VehicleSelectList
                    dropDownPlaceholder = " -- vehicle model -- "
                    optionsList = {this.state.availableVehicleModels}
                    disabled = {this.state.modelsDisabled}
                    method = {null}
                    default = {this.state.vehicleModel}
                  />

                </div>
              </fieldset>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary btn-lg">Save Changes</button>
            </div>
          </div>

        </form>

      </div>
    );
  }

}

export default Edit;
