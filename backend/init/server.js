
var koa        = require('koa');
var path       = require('path');
var mount      = require('koa-mount');
var router     = require('koa-router')();
var koaStatic  = require('koa-static');
var bodyParser = require('koa-bodyparser');


// Initializer
module.exports = function(chotis){

  // XXX
  console.log('--- running server init');

  // Initialize the koa server
  var server = koa();

  // Register json body middleware
  server.use(bodyParser());


  // Get static folders
  var settings = chotis.store.getSettings();

  // Setup folder routes
  settings.folders.forEach(function(folder){
    server.use(mount('/' + folder.name, koaStatic(folder.path)));
  });

  // Load frontend route
  var frontendPath = path.resolve(__dirname, '../../frontend');
  server.use(koaStatic(frontendPath, {defer: true}));


  // Include chotis instance in request context
  server.use(function*(next){
    if( !('chotis' in this) )
      this.chotis = chotis;
    else
      throw new Error('Chotis is already defined in request context');

    yield next;
  });

  // Return the server
  return server;
};