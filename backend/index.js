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
endpoints.forEach(end => {
    const model = (end in models)? models[end] : null;
    app.use('/api/' + end, routes[end](model));
});

app.listen(4444, function(){
    console.log('Running Chotis at localhost:4444');
});
