
var path  = require('path');
var store = require('node-persist');

module.exports = function(chotis){

  // XXX
  console.log('--- running storage init');

  // Init store
  store.initSync({
    ttl: 3000,
    dir: path.resolve(__dirname, '../storage')
  });


  // Return store
  return store;

};