import React, { Component } from 'react';
import { Redirect } from 'react-router';
import TransformerForm from '../components/TransformerForm.js';

class AddNewPage extends Component {

  state = {
    redirect: false
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
    vehicleModel: '',
    id: ''
  }

  getNewId = () => {
    let transformers = [...this.props.transformers];
    let highestId = transformers.map(transformer => transformer.id)
                                .reduce((highest, current) => Math.max(highest, current), -Infinity);
    return highestId + 1;
  }

  addNewTransformer = (preparedData) => {
    preparedData.id = this.getNewId();
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/transformers/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preparedData)
    })
    .then(response => response.json())
    .then(json => {
      // this.setState(prevState => { transformers: [...prevState, json], redirect: true });
      this.setState({ redirect: true });
      this.props.updateTransformersList([...this.props.transformers, json]);
    })
    .catch(error => console.error('Error: ', error));
  }

  render() {

    let { redirect } = this.state;
    if(redirect) {
      return <Redirect to='/' />
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
          submitText="Add Transformer"
        />

      </div>
    );
  }
}

export default AddNewPage;
