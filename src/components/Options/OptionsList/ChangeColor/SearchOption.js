import React, { Component } from 'react';
import './style.css';

export default class ChangeColor extends Component {

    render() {
        return (
            <div className="row">
                <button className="text-left"><span className="fa fa-paint-brush"/> Change Color</button>
            </div>
        );
    }
}