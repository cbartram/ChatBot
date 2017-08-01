import React, { Component } from 'react';
import './style.css';
import Avatar from "../Avatar/Avatar";

export default class Message extends Component {
    renderAvatar = () => {
        return this.props.user >= 1 ? <Avatar user={true} /> : <Avatar user={false} />
    };

    renderText = () => {
        return this.props.user >= 1 ?
            <p className="message-user" style={{backgroundColor: this.props.color}}>{this.props.text}</p> :
            <p className="message-bot" style={{backgroundColor: this.props.color}}>{this.props.text}</p>
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-1">
                    {this.renderAvatar()}
                </div>
                <div className="col-md-9 message">
                    {this.renderText()}
                </div>
            </div>
        );
    }
}