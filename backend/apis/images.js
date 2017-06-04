
const store  = require('../stores/images');
const Router = require('koa-router');


// Setup router
var router = new Router({ prefix: '/api/images' });


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

