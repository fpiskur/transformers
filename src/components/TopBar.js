import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

class TopBar extends Component {

  state = {
    isLoaded: false,
    factions: []
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/fpiskur/transformers-api/factions')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          factions: json
        })
      });
  }

  render() {

    let { isLoaded, factions } = this.state;

    if(!isLoaded) {
      return null;
    } else {
      return (
        <div className="row">
          <div className="col-12 col-md-5">
            <div id="filter" className="d-flex align-items-center">
              <span className="mr-3">Filter:</span>
              <div className="d-inline" aria-label="Factions">
                <a href="#" className="filter-btn">All</a>
                {factions.map(faction => (
                  <span key={faction.id}>
                    <span className="link-separator">|</span>
                    <a href="#" className="filter-btn">{faction.name}</a>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="search-transformers">Search:</span>
              </div>
              <input type="text" className="form-control" placeholder="search by name..." aria-label="Name" aria-describedby="search-transformers"/>
            </div>
          </div>

          <div className="col-12 col-md-2">
            <div className="d-flex justify-content-end">
              <Link type="button" className="btn btn-primary" to="/add-new">Add New</Link>
            </div>
          </div>
        </div>
      );
    }
  }

}

export default TopBar;
