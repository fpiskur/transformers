import React, { Component } from 'react';

class TransformerStatus extends Component {

  state = { status: this.props.status }

  handleStatusChange = (e) => {
    let status = e.target.value;
    fetch(`https://my-json-server.typicode.com/fpiskur/transformers-api/transformers/${this.props.id}`, {
      method: 'PUT',
      headers: {
            "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then((myJson) => {
      this.setState({ status: myJson.status });
    });
  }

  render() {

    return (
      <select className="form-control custom-select" value={this.state.status} onChange={this.handleStatusChange}>
        <option value="OK">OK</option>
        <option value="INJURED">INJURED</option>
        <option value="MIA">MIA</option>
      </select>
    );

  }

}

export default TransformerStatus;
