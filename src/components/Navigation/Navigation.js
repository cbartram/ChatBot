import React, { Component } from 'react';
import './style.css';

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-collapse">
                        <div className="navbar-nav">
                            <p className="navbar-text">Florida Blue ChatBot</p>
                        </div>

                    </div>
                </div>
            </nav>
        );
    }
}