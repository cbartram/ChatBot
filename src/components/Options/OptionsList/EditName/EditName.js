import React, { Component } from 'react';
import './style.css';

export default class EditName extends Component {

    render() {
        return (
            <div className="row">
                <button className="text-left"><span className="fa fa-pencil"/> Edit Name</button>
            </div>
        );
    }
}