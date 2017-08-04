import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

//Custom Components
import MessageList from './components/MessageList/MessageList';
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
import $ from "jquery";
import Moment from 'moment';


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
        padding: '15',
        overflow: 'hidden',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        background: '#FFFFFF',
        transform: 'translate(-50%, -50%)',
        borderRadius: '2px',
    }
};

let socket;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [
                {
                    user: 0,
                    type: 'message',
                    text: 'Hey, Im ChatBot how can I help you today?',
                    color: '#f1f0f0',
                    timestamp: Moment().format('h:mm a')}
                ],
            showSearch: false, //Toggles the search bar open or closed
            queryResults: [],
            links: [],
            modal: false, //Toggles the modal open or closed for the change color
            color: '#0084ff',
            width: $(window).width(),
            height: $(window).height(),
            searchIndex: 0, //The index we are currently at to show the search for,
            auth: false, //Whether the user is authenticated or not
            chain: [] //Array of id's to chain together for the bots conversation
        }
    }

    updateDimensions = () => {
        this.setState({width: $(window).width(), height: $(window).height()});
    };
    componentWillMount = () => {
        this.updateDimensions();
    };

    componentDidMount = () => {
        socket = io.connect('http://localhost:3001');
        window.addEventListener("resize", this.updateDimensions);
    };
    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    /**
     * Handles when a user's message is sent to the chatbot
     * @param message Object A Message object created by the child component
     * */
    handleMessageSubmit = (message) => {
        let {messages, links, chain} = this.state;

        //Send the message to the server
        socket.emit('message', message);

        messages.push(message); //The clients request

        socket.on('message', (res) => {
            if(res.link !== null) {

                //Dont reshow existing links
                let exists = false;
                links.forEach((ele) => {
                    if(ele.link === res.link) {
                        exists = true;
                    }
                });

                !exists && links.push({link: res.link, subject: res.subject, label: res.label, timestamp: res.timestamp});
            }

            //Update auth status before we send a reply so we don't ask to auth in a loop
            this.setState({auth: res.auth}, () => {
                //Ensure user is authenticated
                if(res.requireAuth && !this.state.auth) {

                    //Cache the "normal" response (res) that would have been given if we didn't need to authenticate
                    //so that after we authenticate we can also give the normal response without the user having to ask for it again
                    chain.push(res.id);

                    //They need an auth message prompt
                    messages.push({ user: res.user, type: res.type, text: 'Can you please verify the your date of birth?', color: '#F1F0F0', timestamp: res.timestamp })
                } else {
                    //It requires auth but the user is already authenticated
                    if(res.requireAuth && this.state.auth) {
                        messages.push({user: res.user, type: res.type, text: res.msg, color: '#f1f0f0', timestamp: res.timestamp}); //The servers response
                    }

                    //If it does not require auth and the user is not authenticated
                    if(!res.requireAuth) {
                        messages.push({user: res.user, type: res.type, text: res.msg, color: '#f1f0f0', timestamp: res.timestamp}); //The servers response
                    }
                }
            });

            this.setState({messages, links, chain});
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
              queryResults.push({
                  query: text,
                  message: message.text,
                  from: message.user
              });
          }
      });

      this.setState({queryResults});

    };

    handleColorChange = (color) => {

        let { messages } = this.state;

        messages.push({
            user: 2, //0 is bot, 1 is you, 2 is an event message
            type:'event',
            text: 'You changed the chat color',
            color: color.hex,
            timestamp: null
        });

        this.setState({color: color.hex, messages});

        //Toggle the modal once the color is selected
        this.toggleModal();
    };

    /**
     * Handles iterating through search results
     */
    increaseSearchIndex = () => {
        //If the next index in the queryResults is null
        if(this.state.searchIndex + 1 > this.state.queryResults.length) {
            this.setState({ searchIndex: 0 });
        } else {
            this.setState(prevState => {
                return {searchIndex: prevState.searchIndex + 1}
            })
        }
    };

    /**
     * Handles iterating in reverse through search results
     * */
    decreaseSearchIndex = () => {
        //If the next index in the queryResults is null
        if(this.state.searchIndex - 1 < 0) {
            this.setState({ searchIndex: 0 });
        } else {
            this.setState(prevState => {
                return {searchIndex: prevState.searchIndex - 1}
            });
        }
    };


  render() {
    return (
        <div className="container-fluid">
            <Navigation/>
            <div className="row">
                <div className="col-md-3 no-padd-right">

                    {/* This modal is shown when the color button is clicked */}
                    <Modal isOpen={this.state.modal} contentLabel="Modal" style={customStyles}>
                        <div className="modal-header">
                            Pick a color for this conversation
                            <p className="subtext">Everyone in the conversation will see this</p>
                        </div>
                        <div className="modal-body">
                            <CirclePicker onChange={(color) => this.handleColorChange(color)} circleSize={45} />
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <button className="btn btn-cancel" onClick={this.toggleModal}>Cancel</button>
                            </div>
                        </div>
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
                        <QueryResults results={this.state.queryResults} index={this.state.searchIndex} />
                    </Options>

                </div>
                <div className="col-md-9 no-padd">
                    <div className="well overflow" style={{height: this.state.height - 106}}> {/* Subtract 106 PX from the height for the form */}
                        <SearchBar
                            show={this.state.showSearch}
                            onClick={(text) => this.search(text)}
                            up={this.increaseSearchIndex}
                            down={this.decreaseSearchIndex}
                        />
                        <MessageList messages={this.state.messages} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-9 col-md-offset-3 no-padd">
                    <MessageForm color={this.state.color} onMessageSubmit={(message) => this.handleMessageSubmit(message)} />
                </div>
            </div>

        </div>
        )
     }
}

