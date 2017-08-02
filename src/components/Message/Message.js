import React, { Component } from 'react';
import './style.css';
import Avatar from "../Avatar/Avatar";

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            margin: 11 //Handles shifting the message down some to accommodate for the smaller message "bubble"
        }
    }


    componentDidMount = () => {
        //Shift the margin-top property up some to accommodate the bubble
        if(this.props.text.length <= 40) {
           this.setState({margin: 23})
        }
    };


    renderAvatar = () => {
        return this.props.user === 1 ? <Avatar user={true} /> : <Avatar user={false} />
    };

    renderText = () => {

        switch(this.props.user) {
            case 1:
                return (
                    <div className="row">
                        <div className="col-md-1">
                            {this.renderAvatar()}
                        </div>
                        <div className="col-md-9">
                            <p className="message-user" style={{backgroundColor: this.props.color, marginTop: this.state.margin }}>{this.props.text}</p>
                        </div>
                        <div className="col-md-2">
                            <div className="timestamp" style={{marginTop: this.state.margin}}>
                                { this.props.timestamp }
                            </div>
                        </div>
                    </div>
                );
            case 0:
                return (
                    <div className="row">
                        <div className="col-md-1">
                            {this.renderAvatar()}
                        </div>
                        <div className="col-md-9">
                            <p className="message-bot" style={{backgroundColor: this.props.color, marginTop: this.state.margin }}>{this.props.text}</p>
                        </div>
                        <div className="col-md-2">
                            <div className="timestamp" style={{marginTop: this.state.margin}}>
                                { this.props.timestamp }
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5">
                            <div className="event-text">
                                {this.props.text}
                            </div>
                        </div>
                    </div>
                )
        }
    };

    render() {
        return (
            <div>
                {this.renderText()}
            </div>
        );
    }
}