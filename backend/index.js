
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
  chotis.store  = init.store(chotis);
  chotis.server = init.server(chotis);
  chotis.api    = init.api(chotis);

  // Start http server
  chotis.server.listen(3000);

  // Return running instance
  return chotis;

});


// Run Chotis
Chotis().then(function(chotis){

  // XXX
  // console.log('=== chotis:', chotis);

  // XXX
  var importer = require('./util/importer');
  var path     = require('path');
  var _config = {
    dirPath: path.resolve(__dirname, '../images')
  };

  // // Run importer
  // importer.call(chotis, _config).then(function(result){
  //   console.log('\n=== Importer result:\n');
  //   // console.log(result);
  //
  //   // var someImage = chotis.store.getItem(result[3].id);
  //   // var someImage = chotis.store.findPending();
  //   // console.log('+++ someImage', someImage);
  //
  // }).catch(function(e){
  //   console.log('\n=== Importer ERROR:\n');
  //   console.log(e);
  //   console.log(e.stack);
  // });

}).catch(function(e){
  console.log(e);
  console.log(e.stack);
});
