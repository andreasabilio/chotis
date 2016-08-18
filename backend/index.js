
var requireAll = require('require-all');
var config     = require('./config');
var path       = require('path');
var init       = requireAll(path.resolve(__dirname, './init'));
var co         = require('co');
var _          = require('lodash');



// Chotis async factory
var Chotis = co.wrap(function*(){

  // Empty object singleton
  var chotis = Object.assign({}, {config: config});

  // Build the chotis instance
  chotis.store = init.store(chotis);
  chotis.http  = init.http(chotis);
  chotis.api   = init.api(chotis);

  // Start http server
  chotis.http.listen(3000);

  // Return running instance
  return chotis;

});


// Run Chotis
Chotis().then(function(chotis){

  // XXX
  console.log('=== chotis:', chotis);

}).catch(function(e){
  console.log(e);
  console.log(e.stack);
});
