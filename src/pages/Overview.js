import React, { Component } from 'react';
import TopBar from './components/TopBar.js';
import ListItem from './components/ListItem.js';
import './Overview.css';

class Overview extends Component {

  /*state = {
    transformers: [],
    isLoaded: false
  }

  componentDidMount() {
    fetch('http://localhost:3001/transformers')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          transformers: json
        })
      });
  }*/

  render() {

    /*let { isLoaded, transformers } = this.state;

    if(!isLoaded) {
      return <div className="text-center">Loading...</div>
    } else {*/
      return (
        <div className="container">

          <h1>Transformers Overview</h1>
          <hr/>

          <TopBar/>

          <ListItem/>

        </div>
      );
    /*}*/
  }

}

export default Overview;
