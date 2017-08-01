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
 
 
 ## How it Works
 
 This app is bootstrapped using the `create-react-app` command and as such 
 comes with a webpack dev server which provides hot reloading of the app. 
 
 There is another NodeJS express server which runs concurrently along with the webpack dev server. 
 Any unknown HTTP requests will be proxies by the webpack dev server along to the NodeJS express server which communicates
 directly with Wit.ai's services. 
 
 When a user sends a message the text is sent it a POST request to the Express server where it is passed along to Wit.ai for 
 parsing. Wit.ai will response back with a string representing the `intent` it think best exemplifies the users request. 
 
 From here this intent is acted upon by the Express server and it creates an `intent object` which is used by React to render
 and display the proper responses and associated links
  
 
 # Intent Object 


# Questions or Concerns

Create a new issue on this Github repo!