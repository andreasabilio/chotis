"use strict";

const path      = require('path');
const storage   = require('node-persist').create();
const storePath = path.resolve(__dirname, '../../data/videos');

storage.initSync({ dir: storePath });

module.exports = storage;