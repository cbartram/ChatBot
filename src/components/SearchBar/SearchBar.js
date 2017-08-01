import React, { Component } from 'react';
import './style.css';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    handleTextChange = (e) => {
        this.setState({value: e.target.value});
    };

  doRender = () => {
      if(this.props.show) {
          //Show the search bar
          return (
              <div className="search-container">
                  <div className="row">
                      <div className="col-md-4 col-sm-8 col-xs-9 col-8-custom">
                          <div className="input-group">
                              <span className="input-group-addon" id="basic-addon1"><i className="fa fa-search"/> </span>
                              <input type="text" className="form-control" value={this.state.value} onChange={(e) => this.handleTextChange(e)} placeholder="Search..." aria-describedby="basic-addon1"/>
                          </div>
                      </div>
                      <div className="col-md-2 col-sm-2 col-sm-offset-1">
                          <button className="btn btn-sm btn-primary" onClick={() => this.props.onClick(this.state.value)}> Search</button>

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

