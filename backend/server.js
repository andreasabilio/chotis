
// Load dependencies
const koa        = require('koa');
const path       = require('path');
const mount      = require('koa-mount');
const router     = require('koa-router')();
const koaStatic  = require('koa-static');
const bodyParser = require('koa-bodyparser');

// Load routers
const routers = [
    require('./apis/settings'),
    require('./apis/images'),
    require('./apis/tags'),
    require('./apis/videos')
];

// Load settings store
const settings = require('./stores/settings');

// XXX
console.log(' ');
console.log('>>> Initializing server...');


// Initialize the koa server
const server = koa();
require('koa-qs')(server, 'strict');

// Register json body middleware
server.use(bodyParser());

// XXX
console.log('>>>', settings.getItemSync('mediaPaths'));

// Setup static routes
settings.getItemSync('mediaPaths')
    .forEach(folderPath => {
        server.use(mount('/media', koaStatic(folderPath)))
    });

// Setup frontend route
var frontendPath = path.resolve(__dirname, '../frontend');
server.use(koaStatic(frontendPath, {defer: true}));

// Setup API routes
routers.forEach(rtr => server.use(rtr.routes()));


// Export server
module.exports = server;

