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
import SearchOption from "./components/Options/OptionsList/Search/SearchOption";
import ChangeColor from "./components/Options/OptionsList/ChangeColor/SearchOption";
import Notifications from "./components/Options/OptionsList/Notifications/Notifications";
import EditName from "./components/Options/OptionsList/EditName/EditName";
import LinkContainer from "./components/Options/Links/LinkContainer";
import SearchBar from "./components/SearchBar/SearchBar";
import QueryResults from "./components/QueryResults/QueryResults";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [1],
            messages: [{user: 0, text: 'Hey, Im ChatBot how can I help you today?'}], //Default text sent from the Chat Bot
            showSearch: false,
            queryResults: [],
        }
    }

    /**
     * Handles when a user's message is sent to the chatbot
     * @param message Object A Message object created by the child component
     * */
    handleMessageSubmit = (message) => {
        let {messages} = this.state;

        messages.push(message); //The clients request

        //Scrolls to the bottom when new messages are added
        let elem = document.getElementById('message-container');
        elem.scrollTop = elem.scrollHeight;

        //Send Message to Server
        MessageAPI.send(message, (res) => {
            messages.push({user: 0, text: res.msg}); //The servers response

            this.setState({messages});
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
     * Performs a search query
     * @param text String the text to search the messages for
     * */
    search = (text) => {
      let queryResults = [];

      //O(n) time as messages grow
      this.state.messages.forEach((message) => {
          //Text matches
          if(message.text.includes(text)) {
                queryResults.push(`Found ${text} in ${message.text}`);
          }
      });

      this.setState({queryResults});

    };


  render() {
    return (
        <div className="container-fluid">
            <Navigation/>
            <div className="row">
                <div className="col-md-3" style={{paddingRight:0}}>
                    <Options>
                        <Profile/>
                        <OptionsList name="Options">
                           <SearchOption onClick={this.toggleSearch} />
                           <ChangeColor/>
                           <Notifications/>
                           <EditName/>
                        </OptionsList>
                        <LinkContainer>
                            {/* Links or Pictures from the Conversation go here */}
                        </LinkContainer>
                    </Options>
                </div>
                <div className="col-md-9" style={{paddingLeft:0, borderLeft:0}}>
                    <div className="well overflow" style={{overflowY: 'scroll', overflowX: 'hidden'}} id="message-container">
                        <SearchBar
                            show={this.state.showSearch}
                            onClick={(text) => this.search(text)}
                        />
                        <MessageList
                            messages={this.state.messages}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3" style={{paddingRight:0}}>
                    <QueryResults results={this.state.queryResults} />
                </div>
                <div className="col-md-9" style={{paddingLeft: 0, borderLeft:0 }}>
                    <MessageForm
                        onMessageSubmit={(message) => this.handleMessageSubmit(message)}
                        user={this.state.users}
                    />
                </div>
            </div>

        </div>
        )
     }
}

