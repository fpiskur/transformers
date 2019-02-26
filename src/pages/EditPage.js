import React, { Component } from 'react';
import { Redirect } from 'react-router';
import TransformerForm from '../components/TransformerForm.js';

class EditPage extends Component {

  state = {
    redirect: false
  }

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
    vehicleModel: '',
    id: ''
  }

  saveChanges = (preparedData) => {
    let transformers = [...this.props.transformers];
    let editedTransformerKey;
    for (let i = 0; i < transformers.length; i++) {
      if (transformers[i].id === preparedData.id) {
        editedTransformerKey = i;
      }
    }
    transformers[editedTransformerKey] = preparedData;

    fetch(`https://my-json-server.typicode.com/fpiskur/transformers-api/transformers/${preparedData.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...preparedData })
    })
    .then(response => response.json())
    .then(json => {
      // this.setState({ editedTransformer: json, redirect: true });
      this.setState({ redirect: true });
      this.props.updateTransformersList(transformers);
    })
    .catch(error => console.error('Error: ID not found on fake server'));
  }

  componentWillMount() {
    let transformerId = Number(this.props.match.params.id);
    let [transformer] = this.props.transformers
                     .filter(transformer => transformer.id === transformerId);
    this.editInit = { ...transformer };
  }

  render() {

    let { redirect } = this.state;
    if(redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">
        <h1 className="d-inline-block">Edit Transformer</h1>
        <hr/>

        <TransformerForm
          factions={this.props.factions}
          vehicleTypes={this.props.vehicleTypes}
          init={this.editInit}
          method={this.saveChanges}
          submitText="Save Changes"
        />

      </div>
    );
  }
}

export default EditPage;
