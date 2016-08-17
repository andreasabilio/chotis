
var koa        = require('koa');
var path       = require('path');
var koaStatic  = require('koa-static');

// Initializer
module.exports = function(chotis){

  // Initialize the koa app
  var app = koa();

  // Load frontend static server
  var frontendPath = path.resolve(__dirname, '../../frontend');
  app.use(koaStatic(frontendPath, {defer: true}));

  // Include chotis instance in request context
  app.use(function*(next){

    if( !('chotis' in this) )
      this.chotis = chotis;
    else
      throw new Error('Chotis is already defined in request context');

    yield next;

  });

  // Return the app
  return app;
};