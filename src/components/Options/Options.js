import React, { Component } from 'react';
import './style.css';

export default class Options extends Component {

    render() {
        return (
            <div className="well borderless">
                {this.props.children}
            </div>
        );
    }
}