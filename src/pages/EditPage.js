import React, { Component } from 'react';
import TransformerForm from '../components/TransformerForm.js';

class EditPage extends Component {

  editInit = {
    // Vehicles
    availableVehicleTypes: [],
    availableVehicleModels: [],
    typesDisabled: false,
    modelsDisabled: false,
    // Transformer
    name: '',
    status: '',
    faction: '',
    gear: [],
    vehicleGroup: '',
    vehicleType: '',
    vehicleModel: ''
  }

  componentWillMount() {
    let transformerId = Number(this.props.match.params.id);
    let [ transformer ] = this.props.transformers
                     .filter(transformer => transformer.id === transformerId);
    this.editInit = {
      name: transformer.name,
      status: transformer.status,
      faction: transformer.faction,
      gear: transformer.gear,
      vehicleGroup: transformer.vehicleGroup,
      vehicleType: transformer.vehicleType,
      vehicleModel: transformer.vehicleModel
    };

  }

  saveChanges = (e) => {
    e.preventDefault();
  }

  render() {

    return (
      <div className="container">
        <h1>Edit Transformer</h1>
        <hr/>

        <TransformerForm
          factions={this.props.factions}
          vehicleTypes={this.props.vehicleTypes}
          init={this.editInit}
          method={this.SaveChanges}
          submitText="Save Changes"
        />

      </div>
    );
  }
}

export default EditPage;
