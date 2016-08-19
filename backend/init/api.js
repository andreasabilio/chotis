
var _          = require('lodash');
var path       = require('path');
var Router     = require('koa-router');
var importer   = require('../util/importer');
var status     = require('../util/status');

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
//
//
// var handlers = {
//
//   _get: function*(next){
//
//     // Has
//     if(this.params.id){
//       this.body = this.chotis.store.getItem(this.params.id);
//
//     }
//   },
//
//   //_post: function*(next){
//   //  yield next;
//   //},
//
//   // Patch item
//   _patch: function*(next){
//
//     var stored  = this.chotis.store.getItem(this.params.id);
//     var patched = Object.assign(stored, this.body);
//
//     this.chotis.store.setItem(this.params.id, patched);
//
//     yield next;
//   },
//
//   _delete: function*(next){
//     this.chotis.store.removeItem(this.params.id);
//   }
// };
//
// var types   = ['image', 'video'];
// var methods = Object.keys(handlers).map(function(_method){
//   return _method.replace('_', '');
// });

// Setup router
var router = new Router({
  prefix: '/api'
});


module.exports = function(chotis){

  // XXX
  console.log('--- running api init');

  // XXX
  router.use(function*(next){
    // console.log('\n>>> CTX', this);
    yield next;
  });


  // Item crud
  router.get('/', function*(next){
    this.body = yield this.chotis.store.findItem(this.query)
  });
  router.get('/:id', function*(next){
    this.body = yield this.chotis.store.getItem(this.params.id);
  });
  router.patch('/:id', function*(next){
    // console.log('--- request', this.request.body);
    // console.log('--- id', this.params.id);
    this.body = yield this.chotis.store.updateItem(this.params.id, this.request.body)
  });
  router.del('/:id', function*(next){
    yield this.chotis.store.removeItem(this.params.id);
  });



  // Trigger an import
  router.post('/import', function*(next){
    // TODO
    importer.call(this.chotis, this.body);
    yield next;
  });

  // Get system status
  router.get('/status', function*(){
    // TODO
    // this.body = status.call(this.chotis, this.query);
  });

  // Get system settings
  router.get('/settings', function*(){
    this.body = yield this.chotis.store.getSettings();
  });

  // Update system settings
  router.patch('/settings', function*(){
    this.body = yield this.chotis.store.saveSettings(this.request.body);
  });

  // Get non-tagged item queue
  router.get('/pending', function*(){
    this.body = yield this.chotis.store.findPending();
  });


  // Register router
  chotis.server.use(router.routes());

  // Return router instance
  return router;

};