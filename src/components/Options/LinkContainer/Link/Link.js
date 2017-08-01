import React, { Component } from 'react';
import './style.css';

export default class Link extends Component {

    render() {
        return (
            <div className="row link-row">
                <div className="col-md-8">
                    <a href={this.props.value}><button className={`btn btn-${this.props.label}`}><span className="fa fa-link"/> {this.props.subject}</button></a>
                </div>
            </div>
        );
    }
}