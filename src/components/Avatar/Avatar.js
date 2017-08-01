import React, { Component } from 'react';
import './style.css';

export default class Avatar extends Component {
    render() {
        return this.props.user ? <div className="avatar avatar-user" /> : <div className="avatar avatar-bot" />
    }
}