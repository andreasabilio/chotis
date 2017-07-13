"use strict";

const path      = require('path');
const storage   = require('node-persist').create();
const storePath = path.resolve(__dirname, '../../data/tags');

storage.initSync({ dir: storePath });

module.exports = storage;