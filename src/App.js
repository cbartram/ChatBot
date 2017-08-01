import React, { Component } from 'react';
import * as MessageAPI from './MessageAPI';
import './App.css';

//Custom Components
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm/MessageForm';
import Navigation from './components/Navigation/Navigation';
import Options from "./components/Options/Options";
import Profile from "./components/Options/Profile/Profile";
import OptionsList from "./components/Options/OptionsList/OptionsList";
import Option from './components/Options/OptionsList/Option/Option';
import LinkContainer from "./components/Options/LinkContainer/LinkContainer";
import SearchBar from "./components/SearchBar/SearchBar";
import QueryResults from "./components/QueryResults/QueryResults";
import Modal from "react-modal";
import { CirclePicker } from 'react-color';

//Custom modal styles
const customStyles = {
    overlay:{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.70)'
    },
    content:{
        padding: '0',
        overflow: 'hidden',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        background: '#FFFFFF',
        transform: 'translate(-50%, -50%)',
        borderRadius: '4px',
    }
};

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [1],
            messages: [{user: 0, text: 'Hey, Im ChatBot how can I help you today?', color: '#f1f0f0'}], //Default text sent from the Chat Bot
            showSearch: false, //Toggles the search bar open or closed
            queryResults: [],
            links: [],
            modal: false, //Toggles the modal open or closed
            color: '#0084ff',
        }
    }

    /**
     * Handles when a user's message is sent to the chatbot
     * @param message Object A Message object created by the child component
     * */
    handleMessageSubmit = (message) => {
        let {messages} = this.state;
        let links = [];

        messages.push(message); //The clients request

        //Send Message to Server
        MessageAPI.send(message, (res) => {
            //There is link data coming back from the response that is applied to the conversation context
            if(res.link !== null) {
               links.push({link: res.link, subject: res.subject});
            }

            messages.push({user: 0, text: res.msg, color: '#f1f0f0'}); //The servers response

            this.setState({messages, links});
        });
    };

    /**
     * Toggles the Overhead search bar
    */
    toggleSearch = () => {
      this.setState(prevState => {
          return {showSearch: !prevState.showSearch}
      });
    };

    /**
     * Handles toggling the modal on or off
     */
    toggleModal = () => {
        this.setState(prevState => {
            return {modal: !prevState.modal}
        });
    };

    /**
     * Performs a search query
     * @param text String the text to search the messages for
     * */
    search = (text) => {
      let queryResults = [];

      //O(n) time as messages grow longer
      this.state.messages.forEach((message) => {
          //Text matches
          if(message.text.toUpperCase().includes(text.toUpperCase())) {
                if(message.user === 0) {
                    queryResults.push({__html: `Found <strong>${text}</strong> in the message <strong>"${message.text}"</strong> that was sent from <strong>ChatBot</strong>`});
                } else {
                    queryResults.push({__html: `Found <strong>${text}</strong> in the message <strong>"${message.text}"</strong> that was sent from <strong>You</strong>`});
                }
          }
      });

      this.setState({queryResults});

    };

    handleColorChange = (color) => {
        this.setState({color: color.hex});

        //Toggle the modal once the color is selected
        this.toggleModal();
    };


  render() {
    return (
        <div className="container-fluid">
            <Navigation/>
            <div className="row">
                <div className="col-md-3" style={{paddingRight:0}}>

                    <Modal isOpen={this.state.modal} contentLabel="Modal" style={customStyles}>
                        <div className="modal-header" style={{backgroundColor: this.state.color, border:`3px solid ${this.state.color}`}}>Pick a new Color</div>
                        <CirclePicker onChange={(color) => this.handleColorChange(color)} circleSize={45} />
                    </Modal>


                    <Options>
                        <Profile/>
                        <OptionsList name="Options">
                           <Option onClick={this.toggleSearch} iconClass="fa fa-search" iconColor={this.state.color} text="Search in Conversation" />
                           <Option iconClass="fa fa-paint-brush" iconColor={this.state.color} text="Change Color" onClick={this.toggleModal} />
                           <Option iconClass="fa fa-bell" iconColor={this.state.color} text="Notifications" />
                           <Option iconClass="fa fa-pencil" iconColor={this.state.color} text="Edit Name" />
                        </OptionsList>
                        <LinkContainer data={this.state.links}>
                            {/* Links or Pictures from the Conversation are passed to LinkContainer as props */}
                        </LinkContainer>
                    </Options>

                </div>
                <div className="col-md-9" style={{paddingLeft:0, borderLeft:0}}>
                    <div className="well overflow" style={{overflowY: 'scroll', overflowX: 'hidden'}}>
                        <SearchBar show={this.state.showSearch} onClick={(text) => this.search(text)} />
                        <MessageList messages={this.state.messages} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3" style={{paddingRight:0}}>
                    <QueryResults results={this.state.queryResults} />
                </div>
                <div className="col-md-9" style={{paddingLeft: 0, borderLeft:0 }}>
                    <MessageForm color={this.state.color} onMessageSubmit={(message) => this.handleMessageSubmit(message)} user={this.state.users} />
                </div>
            </div>

        </div>
        )
     }
}

