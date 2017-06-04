
const path    = require('path');
const store   = require('node-persist');


// Store settings
const storeSettings = {
    dir: path.resolve(__dirname, 'data')
};

// Init store
store.initSync(storeSettings);

// XXX
console.log('>>> Tags is initialized');

// Export store singleton
module.exports = store;