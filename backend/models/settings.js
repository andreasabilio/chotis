"use strict";

const path      = require('path');
const storage   = require('node-persist').create();
const storePath = path.resolve(__dirname, '../../data/settings');

storage.initSync({ dir: storePath });

module.exports = storage;