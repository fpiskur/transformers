import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

class TopBar extends Component {

  state = { searchTerm: '' }

  filterList = (e) => {
    let faction = e.target.value;
    this.props.filterList(faction);
  }

  render() {

    let { factions } = this.props;

    return (
      <div className="row">
        <div className="col-12 col-md-5">
          <div id="filter" className="d-flex align-items-center">
            <span className="mr-3">Filter:</span>
            <div className="d-inline" aria-label="Factions">
              <button
                type="button"
                value="All"
                className="btn btn-link p-0"
                onClick={this.filterList.bind(this)}
              >All</button>

              {factions.map(faction => (
                <span key={faction.id}>
                  <span className="link-separator">|</span>
                  <button
                    type="button"
                    value={faction.name}
                    className="btn btn-link p-0"
                    onClick={this.filterList.bind(this)}
                  >{faction.name}</button>
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
            <input type="text"
              className="form-control"
              placeholder="search by name..."
              aria-label="Name"
              aria-describedby="search-transformers"
            />
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

export default TopBar;
