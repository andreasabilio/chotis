
const _       = require('lodash');
const path    = require('path');
const store   = require('node-persist');


// Store settings
const storeSettings = {
    dir: path.resolve(__dirname, 'data')
};

// Init store
store.initSync(storeSettings);

// XXX: Development settings
store.setItemSync('mediaPaths', [path.resolve(__dirname, '../../../media/videos')]);

// XXX
console.log('>>> Settings is initialized', store.getItemSync('mediaPaths'));

// Export store singleton
module.exports = store;