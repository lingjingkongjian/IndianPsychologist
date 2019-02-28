import { Meteor } from 'meteor/meteor';  
import express from 'express';

export function setupApi() {  

    // use REST API
    const app = express();

    app.get('/api', (req, res) => {
        res.status(200).json({ message: 'Hello World!!!'});
    });

    // https://github.com/mongo-express/mongo-express
    var mongo_express = require('mongo-express/lib/middleware')
    var mongo_express_config = require('./config.default')

    app.use('/admin', mongo_express(mongo_express_config))
    /////////////////////////////////////////////////

    WebApp.connectHandlers.use(app);

    // use websockets -- not working
    const WebSocket = require('ws');
    const ws = new WebSocket('ws://localhost:3000/websocket');

    ws.on('open', function open() {
        ws.send('something');
    });

    ws.on('message', function incoming(data) {
        console.log(data);
    });

}

// /server/imports/api/index.js