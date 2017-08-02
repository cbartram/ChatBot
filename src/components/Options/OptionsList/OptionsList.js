import React, { Component } from 'react';
import './style.css';

export default class OptionsList extends Component {

    render() {
        return (
            <div className={`row border-top ${this.props.additionalClass}`} style={{width: '100%', overflow:'hidden'}}>
                <div className="col-md-9 margin">
                    <span className="options-text">{this.props.name}</span>
                </div>
                { this.props.children }
            </div>
        );
    }
}