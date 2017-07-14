"use strict";

const path      = require('path');
const storage   = require('node-persist').create();
const storePath = path.resolve(__dirname, '../../data/images');

storage.initSync({ dir: storePath });

module.exports = storage;