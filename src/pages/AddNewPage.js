import React, { Component } from 'react';
import { Redirect } from 'react-router';
import TransformerForm from '../components/TransformerForm.js';

class AddNewPage extends Component {

  state = {
    redirect: false,
    response: {}
  }

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

  addNewTransformer = (preparedData) => {
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/transformers/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preparedData)
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ response: json, redirect: true })
    })
    .catch(error => console.error('Error: ', error));
  }

  render() {

    let { redirect } = this.state;
    if(redirect) {
      return <Redirect to={{
          pathname: '/',
          state: this.state.response
        }}
      />
    }
    
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
