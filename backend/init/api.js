
var _          = require('lodash');
var path       = require('path');
var router     = require('koa-router');
var importer   = require('../util/importer');
//var requireAll = require('require-all');
//var _endpoints  = requireAll(path.resolve(__dirname, './endpoints'));

// XXX
//console.log('+++', endpoints);

//var endpoints = {
//  image: [
//    {
//      pattern: '',
//      method: '',
//      handler: function*(next){
//
//      }
//    }
//  ],
//  video: [],
//  import: []
//};


var handlers = {

  _get: function*(next){

    // Has
    if(this.params.id){
      this.body = this.chotis.store.getItem(this.params.id);

    }
  },

  //_post: function*(next){
  //  yield next;
  //},

  // Patch item
  _patch: function*(next){

    var stored  = this.chotis.store.getItem(this.params.id);
    var patched = Object.assign(stored, this.body);

    this.chotis.store.setItem(this.params.id, patched);

    yield next;
  },

  _delete: function*(next){
    this.chotis.store.removeItem(this.params.id);
  }
};

var types   = ['image', 'video'];
var methods = Object.keys(handlers).map(function(_method){
  return _method.substr('_', '');
});


module.exports = function(chotis){

  // XXX
  console.log('--- running api init', chotis);

  //types.forEach(function(type){
  //  methods.forEach(function(method){
  //    router[method]('');
  //  });
  //});


  // Tags
  router.get('/tag', function*(next){
    this.body = this.chotis.store.getItem('__tags');
  });
  router.get('/tag/:id', function*(next){
    this.body = this.chotis.store.values().filter(item => {
      return -1 !== item.tags.indexOf(this.params.id);
    });
  });
  router.post('/tag', function*(next){
    var tag  = this.body;
    var tags = this.chotis.store.getItem('__tags') || [];
    tags.push(tag);
  });
  router.del('/tag/:id', function*(next){
    this.chotis.store.removeItem(this.params.id);
  });



  // Register router
  chotis.http.use('/api', router.routes());

  return true;

};