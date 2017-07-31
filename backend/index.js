"use strict";

const path       = require('path');
const reqAll     = require('require-all');
const express    = require('express');
const bodyParser = require('body-parser');

const app       = express();
const models    = reqAll(path.join(__dirname, 'models'));
const routes    = reqAll(path.join(__dirname, 'routes'));
const endpoints = Object.keys(routes);

// Update models
const update = require('./update');
update(path.resolve(__dirname, '../media'), models);

// Init json body parser
app.use(bodyParser.json());

// Register routes && inject models
endpoints.forEach(endpoint => {
    const model = (endpoint in models)? models[endpoint] : null;
    app.use('/api/' + endpoint, routes[endpoint](model));
});

app.listen(4444, function(){
    console.log('Running Chotis at localhost:4444');
});
