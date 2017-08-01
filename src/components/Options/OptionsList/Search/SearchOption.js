import React, { Component } from 'react';
import './style.css';

export default class SearchOption extends Component {

    render() {
        return (
            <div className="row">
                <button className="text-left" onClick={this.props.onClick}><span className="fa fa-search" style={{color:'#0084ff'}}/> Search in Conversation</button>
            </div>
        );
    }
}