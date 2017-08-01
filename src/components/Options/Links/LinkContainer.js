import React, { Component } from 'react';
import './style.css';
import OptionsList from "../OptionsList/OptionsList";

export default class LinkContainer extends Component {

    render() {
        return (
            <div className="row large">
                <OptionsList name="Links"/>
                {this.props.children}
            </div>
        );
    }
}