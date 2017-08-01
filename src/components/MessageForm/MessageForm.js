import React, { Component } from 'react';
import './style.css';

export default class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //Create the Message Object
        let message = {
            user : this.props.user,
            text : this.state.text,
            color : this.props.color,
        };

        this.props.onMessageSubmit(message);

        this.setState({ text: '' });
    };

    changeHandler = (e) => {
        if(typeof e.target.value !== 'undefined') {
            this.setState({text: e.target.value});
        }
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
    };

    render() {
        return(
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <textarea
                        type="submit"
                        className="form-input"
                        placeholder="Type a Message..."
                        onKeyDown={(e) => this.changeHandler(e)}
                        onChange={(e) => this.changeHandler(e)}
                        value={this.state.text}
                    />
                </form>
        );
    }
}