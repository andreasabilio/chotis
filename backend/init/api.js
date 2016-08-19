
var _          = require('lodash');
var path       = require('path');
var router     = require('koa-router')();
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


module.exports = function(chotis){

  // XXX
  console.log('--- running api init');



  // Item crud
  router.get('/', function*(next){
    this.body = this.chotis.store.findItem(this.query)
  });
  router.get('/:id', function*(next){
    this.body = this.chotis.store.getItem(this.params.id);
  });
  router.patch('/:id', function*(next){
    this.chotis.store.updateItem(this.params.id, this.body)
  });
  router.del('/:id', function*(next){
    this.chotis.store.removeItem(this.params.id);
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

  // Get non-tagged item queue
  router.get('/pending', function*(){
    this.body = this.chotis.store.findPending();
  });



  // Register router
  chotis.http.use(router.routes());
  // TODO: prefix
  // chotis.http.use('/api', router.routes());

  // Return router instance
  return router;

};