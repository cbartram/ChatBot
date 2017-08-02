/**
 * Created by Christian Bartram on 6/8/17.
 */
'use strict';

global.navigator = { userAgent: 'all' };

const path = require('path');
const Server =  require('http');
const Express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
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
                        res.json({
                            msg: `You have 5 Providers near you the closest one is 3.2 miles from you, I've marked their location in your links!`,
                            link: 'http://maps.apple.com/?q=Doctor',
                            subject: 'Care Providers',
                            label: 'danger',
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    case 'deductible_info':
                        res.json({
                            msg: 'You have the Premium plan it has a $500 deductible and lots of great healthy benefits.',
                            link: null,
                            subject: null,
                            label: null,
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    case 'insurance_purchase':
                        res.json({
                            msg: 'Awesome! I can recommend the BlueSelect or BlueOptions plans for you for only $226 and $310 per month respectively!',
                            link: 'https://consumer.websales.floridablue.com/cws/shopping/info',
                            subject: 'Insurance Purchase Info',
                            label: 'primary2',
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    case 'test':
                        res.json({
                            msg: 'I read you loud and clear! What can I assist you with today?',
                            link: null,
                            subject: null,
                            label: null,
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    case 'greeting':
                        res.json({
                            msg: 'Hello! How can I help you today?',
                            link: null,
                            subject: null,
                            label: null,
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    case 'bye':
                        res.json({
                            msg: 'Glad I could help, have a fantastic rest of your day!', link: null,
                            subject: null,
                            label: null,
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    case 'help':
                        res.json({
                            msg: 'What can I help you with? I can help with things like Insurance Purchases, Deductible information, and Provider data.',
                            link: null,
                            subject: null,
                            label: null,
                            timestamp: moment().format('h:mm a')
                        });
                        break;
                    default:
                        console.log(data.entities.intent);
                        res.json({
                            msg: 'Yikes not really sure what to do',
                            link: null,
                            subject: null,
                            label: null,
                            timestamp: moment().format('h:mm a')
                        })
                }
            } else {
                res.json({
                    msg: 'Sorry im not sure what to do with your request. Try asking something like "Find my provider" or "Help me find a plan"', link: null,
                    subject: null,
                    label: null,
                    timestamp: moment().format('h:mm a')
                })
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