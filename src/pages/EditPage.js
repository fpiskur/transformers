import React, { Component } from 'react';
import VehicleSelectList from '../components/VehicleSelectList.js';
import Gear from '../components/Gear.js';

class EditPage extends Component {

  state = {
    availableVehicleTypes: [],
    availableVehicleModels: [],
    typesDisabled: false,
    modelsDisabled: false,
    name: this.props.location.state.transformer.name,
    status: this.props.location.state.transformer.status,
    faction: this.props.location.state.transformer.faction,
    gear: this.props.location.state.transformer.gear,
    vehicleGroup: this.props.location.state.transformer.vehicleGroup,
    vehicleType: this.props.location.state.transformer.vehicleType,
    vehicleModel: this.props.location.state.transformer.vehicleModel
  }

  uniqueVehicleGroups = [...new Set(this.props.vehicleTypes.map(vehicle => vehicle.group))]

  componentWillMount() {
    let availableVehicleTypes = this.getUniqueVehicleTypes(this.state.vehicleGroup);
    let availableVehicleModels = this.getUniqueVehicleModels(this.state.vehicleType);
    this.setState({
      availableVehicleTypes: availableVehicleTypes,
      availableVehicleModels: availableVehicleModels
    });
  }

  getUniqueVehicleTypes(vehicleGroup) {
    let allGroupTypes = this.props.vehicleTypes.filter(selectedType => selectedType.group === vehicleGroup)
                                           .map(vehicle => vehicle.type);
    return [...new Set(allGroupTypes)];
  }

  getUniqueVehicleModels(vehicleType) {
    return this.props.vehicleTypes.filter(selectedModel => selectedModel.type === vehicleType)
                              .map(vehicle => vehicle.model);
  }

  handleGroupChange = (e) => {
    let {value} = e.target;
    let uniqueVehicleTypes = this.getUniqueVehicleTypes(value);

    this.setState({
      availableVehicleTypes: uniqueVehicleTypes,
      availableVehicleModels: [],
      typesDisabled: false,
      modelsDisabled: true
    });
  }

  handleTypeChange = (e) => {
    let {value} = e.target;
    let vehicleModels = this.props.vehicleTypes.filter(selectedModel => selectedModel.type === value)
                                           .map(vehicle => vehicle.model);

    this.setState({
      availableVehicleModels: vehicleModels,
      modelsDisabled: false
    });
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
    let { factions } = this.props;

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
            <div className="col-12 col-md-4 mb-1">
              <Gear gear={this.state.gear} />
            </div>

            <div className="w-100"></div>

            <div className="col-9 col-md-4 offset-md-2">
              <input type="text" className="form-control" id="gear" placeholder="Enter gear item"/>
            </div>
            <div className="col-3 col-md-1">
              <button type="button" className="btn btn-primary">Add</button>
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
                    optionsList = {this.uniqueVehicleGroups}
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

export default EditPage;
