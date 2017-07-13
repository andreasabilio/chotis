
const path   = require('path');
const reqAll = require('require-all');

const storage  = reqAll(path.join(__dirname, 'storage'));
const importer = require('./importer');

// XXX
// console.log('>>>', storage);

importer(path.resolve(__dirname, '../media'), storage);