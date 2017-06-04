
const store  = require('../stores/videos');
const Router = require('koa-router');


// Setup router
var router = new Router({ prefix: '/api/videos' });


// Setup CRUD
router.get('/', function*(next){
    this.body = yield store.findItem(this.query)
});

router.get('/:id', function*(next){
    this.body = yield store.getItem(this.params.id);
});

router.patch('/:id', function*(next){
    this.body = yield store.updateItem(this.params.id, this.request.body)
});

router.del('/:id', function*(next){
    yield store.removeItem(this.params.id);
});


// Export routes
module.exports = router;

