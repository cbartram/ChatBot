 # ChatBot
 A Simple Wit.Ai powered Healthcare Chatbot which can answer questions about insurance plans, finding providers, and deductibles
 
 ## Installation
 
 Installing this software is simple! 
 
 Clone the repo
 
 `git clone https://github.com/cbartram/ChatBot.git`
 
 Install any dependencies 
 
 `npm install`
 
 Start the app
 
 `npm start`
 
 The app will be available at `http://localhost:3000`
 
 
 ## Testing
 
 This repo already comes preconfigured with several unit tests. 
 To run the tests simply use:
 
 `npm run test`
 

 ## Production Ready Build
 To run a production build and transpile all the source code run:
 
 `npm run build`
 
 
 ## How it Works
 
 This app is bootstrapped using the `create-react-app` command and as such 
 comes with a webpack dev server which provides hot reloading of the app. 
 
 There is another NodeJS express server which runs concurrently along with the webpack dev server. 
 Any unknown HTTP requests will be proxied by the webpack dev server along to the NodeJS express server which communicates
 directly with Wit.ai's services. 
 
 When a user sends a message the text is sent it a POST request with a `message object` body (see Message Object below) to the Express server where it is passed along to Wit.ai for 
 parsing. Wit.ai will respond back with a string representing the `intent` it thinks best exemplifies the users request. 
 
 From here this intent is acted upon by the Express server and it creates an `intent object` which is used by React to render
 and display the proper chatbot responses and associated links in the user interface.
  
 Its important to know that the server and client communicate with **message object requests** and **Intent Object responses**
 
 # Intent Object 
 
 The intent object is the response coming back from the Express server and contains information vital to displaying a message
 from the Chat Bot back to the user.
 
 | **Property Name** | **Property Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                   |
 |-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | `msg`             | `String`          | This is the Bots response text which will be placed inside the chat bubble                                                                                                                                                                                                                                                                                                                        |
 | `type`            | `String`          | The message type defines whether the message is just a plain old text message, if its a picture message, or if its an event message. The value should either be `message` or `event` Event messages are created and sent by the Application itself and occurs when an "event" takes place in the conversation. For example: the user changes their chat color, an event would be sent in the message window saying "You changed your chat color". |
 | `link`            | `String`          | The link specifies an HTTP link to be placed in a button linking to a specific context that was referenced in the conversation. If there is no link to go along with the context **then leave link as `null`**.  For example saying "hi" doesn't have much reference, however, saying "Find me doctors nearby" might have a Google Maps link to doctors close by.                                 |
 | `subject`         | String            | The subject specifies the link button's primary text attribute                                                                                                                                                                                                                                                                                                                                    |
 | `label`           | String            | Primary, Danger, Warning or Success to style the button different colors. This attribute is purely cosmetic                                                                                                                                                                                                                                                                                       |
 | `timestamp`       | String            | The timestamp should be a string (usually a formatted momentJS object) which specifies when the message was sent. It is displayed to the right of the message in the dialogue box                                                                                                                                                                                                                 |
 
 An example message object might look like this in the context of the following conversation
 
 Bot: "How can I help you?"
 
 User: "Id like to buy some insurance"
 
 ```javascript
{
    msg: 'Sure thing, which plan would you like to purchase?',
    type: 'message',
    link: 'https://someinsuranceplans.com/thebestplan',
    subject: 'Relevant Insurance Plans',
    label: 'primary',
    timestamp: moment().format('h:mm a')
}
```
 # Message Object
The message object is the "request" made to the Express server in order for Wit.ai to process
the users intent. The message object is both sent to the server and automatically appended to the conversation by the client. 

| **Property Name** | **Property Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                   |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `user`            | `Integer`         | This determines "who" is talking. Use 1 for the user (the human typing), 0 for the bot responding, and 2 for an event message                                                                                                                                                                                                                                                                     |
| `type`            | `String`          | The message type defines whether the message is just a plain old text message, if its a picture message, or if its an event message. Event messages are created and sent by the Application itself and occurs when an "event" takes place in the conversation. For example: the user changes their chat color, an event would be sent in the message window saying "You changed your chat color". |
| `text`            | `String`          | This is the actual text the user typed. It is sent over to the Express server for Wit.ai to process and is also applied to the bottom of the conversation in the chat bubble                                                                                                                                                                                                                      |
| `color`           | String            | The chat bubbles color this is a hexadecimal color code `#00FF00`                                                                                                                                                                                                                                                                                                                                 |
| `timestamp`       | String            | The timestamp should be a string (usually a formatted momentJS object) which specifies when the message was sent. It is displayed to the right of the message in the dialogue box                                                                                                                                                                                                                 |

A message object might look something like this in the context of the conversation below

Bot: "Hello what can I help you with?"

User <Message Object>

```javascript
{
    user: 1, //because the user is the one talking
    type: 'message', //Its just a plain ole' message not a picture/event
    text: 'I need to find a doctor fast!' //This is what the user typed
    color: '#046AFF' //Chat bubble color
    timestamp: moment().format('h:mm a') //7:14 AM
}
```

## Built With

* [React JS](https://facebook.github.io/react/) - The web framework used on the frontend for the UI Components
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Wit.ai](https://wit.ai) - Used as Machine learning and NLP models to power the chat bot
* [Express](https://expressjs.com/) - Used to power the Proxy Server HTTP requests and routes
* [NodeJS](https://nodejs.org) - Used to power the Proxy Server

## Versioning

We use [SemVer](http://semver.org/) for versioning.

# Author

Christian Bartram  [Cbartram Github](https://github.com/cbartram)

# Contributing

Create a new issue on this Github repo if you have any questions or concerns!