
var _           = require('lodash');
var fs          = require('fs');
var co          = require('co');
var md5File     = require('md5-file/promise');
var isImage     = require('is-image');
var isVideo     = require('is-video');
var isDirectory = require('is-directory');
var Promise     = require('bluebird');
var readDir     = Promise.promisify(fs.readdir);
var isDir       = Promise.promisify(isDirectory);


var itemFactory = function(type, item){
    return {
        id:   md5File.sync(item),
        path: item,
        url:  null, // TODO
        type: type,
        tags: []
    };
};


var storeItem = function(item){
    return this.store.addItem(item);
};


var importer = co.wrap(function*(config){

    // Get files in directory
    var candidates = yield readDir(config.dirPath)
        .map(file => config.dirPath + '/' + file);

    // Get folders && images
    var folders = candidates.filter(item => fs.lstatSync(item).isDirectory());
    var images  = candidates.filter(isImage).map(itemFactory.bind(null, 'image'));
    var videos  = candidates.filter(isVideo).map(itemFactory.bind(null, 'video'));

    // Import recursively?
    if(config.recursive)
        folders.forEach((folder) => {
            importer.call(this, Object.assign(config, {dirPath: folder}));
        });

    // Store images && videos
    var collection = _.union(images, videos);
    collection.forEach(storeItem.bind(this));

    // XXX
    return collection;

});

module.exports = importer;