import React, { Component } from 'react';
import VehicleSelectList from '../components/VehicleSelectList.js';
import GearForm from '../components/GearForm.js';

class AddNewPage extends Component {

  state = {
    gear: [],
    // Vehicles
    availableVehicleTypes: [],
    availableVehicleModels: [],
    typesDisabled: true,
    modelsDisabled: true,
    // Input values
    inputs: {
      name: '',
      status: 'OK',
      faction: '',
      vehicleGroup: '',
      vehicleType: '',
      vehicleModel: ''
    },
    // Validation
    checked: false,
    validationGroup: {
      name: false,
      faction: false,
      vehicleGroup: false,
      vehicleType: false,
      vehicleModel: false
    }
  }

  uniqueVehicleGroups = [...new Set(this.props.vehicleTypes.map(vehicle => vehicle.group))]

  handleNameChange = (e) => {
    let {value} = e.target;
    let nameValid = this.state.checked && value ? true : false;
    let klasa = this.state.checked && value ? '' : 'red-border';
    if (!nameValid) { document.getElementById('name').classList.add(klasa); }
    this.setState(prevState => ({
      inputs: { ...prevState.inputs, name: value },
      validationGroup: { ...prevState.validationGroup, name: nameValid }
    }));
  }

  handleStatusChange = (e) => {
    let {value} = e.target;
    this.setState(prevState => ({ inputs: { ...prevState.inputs, status: value } }));
  }

  handleFactionChange = (e) => {
    let {value} = e.target;
    this.setState(prevState => ({ inputs: { ...prevState.inputs, faction: value } }));
  }

  handleGroupChange = (e) => {
    let {value} = e.target;
    let groupTypes = this.props.vehicleTypes.filter(selectedType => selectedType.group === value)
                                            .map(vehicle => vehicle.type);
    let uniqueVehicleTypes = [...new Set(groupTypes)];

    this.setState(prevState => ({
      availableVehicleTypes: uniqueVehicleTypes,
      availableVehicleModels: [],
      typesDisabled: false,
      modelsDisabled: true,
      inputs: { ...prevState.inputs, vehicleGroup: value }
    }));
  }

  handleTypeChange = (e) => {
    let {value} = e.target;
    let vehicleModels = this.props.vehicleTypes.filter(selectedModel => selectedModel.type === value)
                                               .map(vehicle => vehicle.model);

    this.setState(prevState => ({
      availableVehicleModels: vehicleModels,
      modelsDisabled: false,
      inputs: { ...prevState.inputs, vehicleType: value }
    }));
  }

  handleModelChange = (e) => {
    let {value} = e.target;
    this.setState(prevState => ({ inputs: { ...prevState.inputs, vehicleModel: value } }));
  }

  addNewTransformer = (e) => {
    e.preventDefault();
  }

  checkValidation = (e) => {
    let validationGroup = this.state.validationGroup;
    for (let input in this.state.inputs) {
      if (this.state.inputs.hasOwnProperty(input) && input !== 'status') {
        if (this.state.inputs[input]) {
          validationGroup[input] = true;
        }
      }
    }
    this.setState(prevState => ({ checked: true, validationGroup: validationGroup }));
  }

  render() {

    let { factions } = this.props;

    return (
      <div className="container">

        <h1>Add New Transformer</h1>
        <hr/>

        <form onSubmit={this.addNewTransformer}>

          <div className="row form-group">
            <div className="col-12 col-md-2">
              <label htmlFor="name">Name:</label>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                onChange={this.handleNameChange}
                required
              />
            </div>
            <div className="col-12 col-md-2">
              <label htmlFor="status">Status:</label>
            </div>
            <div className="col-12 col-md-2">
              <select className="form-control custom-select" id="status" onChange={this.handleStatusChange}>
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
              <select
                className="form-control custom-select"
                id="faction"
                onChange={this.handleFactionChange}
                required
              >
                <option hidden value=""> -- choose faction -- </option>
                {factions.map(faction => (
                  <option key={faction.id} value={faction.name}>{ faction.name }</option>
                ))};
              </select>
            </div>
          </div>

          <GearForm gear={this.state.gear} />

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
                    default = ""
                    vehicleId = "vehicleGroup"
                  />

                  <VehicleSelectList
                    dropDownPlaceholder = " -- vehicle type -- "
                    optionsList = {this.state.availableVehicleTypes}
                    disabled = {this.state.typesDisabled}
                    method = {this.handleTypeChange}
                    default = ""
                    vehicleId = "vehicleType"
                  />

                  <VehicleSelectList
                    dropDownPlaceholder = " -- vehicle model -- "
                    optionsList = {this.state.availableVehicleModels}
                    disabled = {this.state.modelsDisabled}
                    method = {this.handleModelChange}
                    default = ""
                    vehicleId = "vehicleMode"
                  />

                </div>
              </fieldset>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary btn-lg" onClick={this.checkValidation}>Add Transformer</button>
            </div>
          </div>

        </form>

      </div>
    );

  }

}

export default AddNewPage;
