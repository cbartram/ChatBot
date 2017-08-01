import React, { Component } from 'react';
import './style.css';

export default class OptionsList extends Component {

    render() {
        return (
            <div className="row border-top" style={{width: '100%'}}>
                <div className="col-md-9 margin">
                    <span className="options-text">{this.props.name}</span>
                </div>
                <div className="col-md-3 margin">
                    <span className="fa fa-ellipsis-h" />
                </div>
                { this.props.children }
            </div>
        );
    }
}