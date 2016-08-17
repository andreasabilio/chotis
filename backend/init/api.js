
var _          = require('lodash');
var path       = require('path');
var router     = require('koa-router');
var importer   = require('../util/importer');
//var requireAll = require('require-all');
//var _endpoints  = requireAll(path.resolve(__dirname, './endpoints'));

// XXX
console.log('+++', endpoints);

var endpoints = {
  image: [
    {
      pattern: '',
      method: '',
      handler: function*(next){

      }
    }
  ],
  video: [],
  import: []
};


module.exports = function(chotis){

  var handlers = {
    fetch: function*(next){

      var params = this.params;
      var type   = params.type || null;
      var id     = params.id || null;




    }
  };

  // XXX
  console.log('--- running api init', chotis);

  router.post('/import', function*(next){

  });



  // Register router
  chotis.http.use('/api', router.routes());

  return true;

};