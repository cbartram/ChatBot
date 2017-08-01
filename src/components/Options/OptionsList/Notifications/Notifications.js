import React, { Component } from 'react';
import './style.css';

export default class Notifications extends Component {

    render() {
        return (
            <div className="row">
                <button className="text-left"><span className="fa fa-bell"/> Notifications</button>
            </div>
        );
    }
}