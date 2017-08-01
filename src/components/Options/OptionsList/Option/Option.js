import React, { Component } from 'react';
import './style.css';

export default class Option extends Component {

    render() {
        return (
            <div className="row">
                <button className="text-left" onClick={this.props.onClick}><span className={this.props.iconClass} style={{color: this.props.iconColor}}/> {this.props.text}</button>
            </div>
        );
    }
}