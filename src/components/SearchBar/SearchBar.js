import React, { Component } from 'react';
import './style.css';

export default class SearchBar extends Component {

  doRender = () => {
      if(this.props.show) {
          //Show the search bar
          return (
              <div className="search-container">
                  <div className="row">
                      <div className="col-md-5 col-8-custom">
                          <form>
                              <label className="fa fa-search" htmlFor="#search-bar">
                                  &nbsp;<input id="search-bar" type="text" placeholder="Search..." className="search-input" />
                              </label>
                          </form>
                      </div>
                      <div className="col-md-2">
                          <button className="btn btn-sm btn-primary" onClick={this.props.onClick}> Search</button>
                      </div>
                  </div>
              </div>
          );
      } else {
          //Show nothing
          return null;
      }
  };


  render() {
    return (
        <div>
            { this.doRender() }
        </div>
        )
     }
}

