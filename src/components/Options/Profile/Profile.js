import React, { Component } from 'react';
import './style.css';
import Avatar from '../../Avatar/Avatar';

export default class Profile extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="avatar-container">
                        <Avatar user={true} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <span className="name">John Doe</span>
                    </div>
                    <div className="row">
                        <span className="name-subtitle">Last Active 1d Ago</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <span className="fa fa-cog"/>
                </div>
            </div>
        );
    }
}