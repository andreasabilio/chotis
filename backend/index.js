"use strict";

const path    = require('path');
const reqAll  = require('require-all');
const express = require('express');

const app       = express();
const storage   = reqAll(path.join(__dirname, 'storage'));
const routes    = reqAll(path.join(__dirname, 'routes'));
const endpoints = Object.keys(routes);

// XXX
// const importer = require('./importer');
// importer(path.resolve(__dirname, '../media'), storage);

// Register routes
endpoints.forEach(end => {
    const store = (end in storage)? storage[end] : null;
    app.use('/' + end, routes[end](store));
});

app.listen(4444, function(){
    console.log('Running Chotis at localhost:4444');
});
