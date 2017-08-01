/**
 * Created by Christian Bartram on 6/8/17.
 */
'use strict';

global.navigator = { userAgent: 'all' };

const path = require('path');
const Server =  require('http');
const Express = require('express');
const bodyParser = require('body-parser');
const { Wit } = require('node-wit');

// initialize the server and configure support for ejs templates
const app = new Express();
const server = Server.createServer(app);

const client = new Wit({
    accessToken: "WIPCNZGMJ5KSPEHCQQUAEVYP55MXIIX2",
});


// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/send', (req, res) => {

    const text = req.body.text; //The user chat text

    //Invoke Wit.AI NLP Engine
    client.message(text, {})
        .then((data) => {
            //Find providers and notify client
            if(data.entities.hasOwnProperty('intent')) {
                switch(data.entities.intent[0].value) {
                    case 'find_providers':
                        res.json({msg: 'You have 5 Providers near you the closest one is 3.2 miles from you!'});
                        break;
                    default:
                        console.log(data.entities.intent);
                        res.json({msg: 'Yikes not really sure what to do'})


                }
            } else {
                res.json({msg: 'Sorry im not sure what to do with your request :('})
            }
        }).catch(console.error);
});

// universal routing and rendering
app.get('*', (req, res) => {

});

// start the server
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});