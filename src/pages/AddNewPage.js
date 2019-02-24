import React, { Component } from 'react';
import TransformerForm from '../components/TransformerForm.js';

class AddNewPage extends Component {

  addNewInit = {
    // Vehicles
    availableVehicleTypes: [],
    availableVehicleModels: [],
    typesDisabled: true,
    modelsDisabled: true,
    // Transformer values
    name: '',
    status: 'OK',
    faction: '',
    gear: [],
    vehicleGroup: '',
    vehicleType: '',
    vehicleModel: ''
  }

  addNewTransformer = (e) => {
    e.preventDefault();
  }

  render() {

    return (
      <div className="container">

        <h1>New Transformer</h1>
        <hr/>

        <TransformerForm
          factions={this.props.factions}
          vehicleTypes={this.props.vehicleTypes}
          init={this.addNewInit}
          method={this.addNewTransformer}
          submitText="Add To List"
        />

      </div>
    );

  }

}

export default AddNewPage;
