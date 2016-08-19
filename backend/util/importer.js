
var _           = require('lodash');
var fs          = require('fs');
var co          = require('co');
var md5File     = require('md5-file/promise');
var isImage     = require('is-image');
var isVideo     = require('is-video');
var koaStatic   = require('koa-static');
var isDirectory = require('is-directory');
var Promise     = require('bluebird');
var readDir     = Promise.promisify(fs.readdir);
var isDir       = Promise.promisify(isDirectory);


var itemFactory = function(type, item){

    // Build item relative url
    var url = this._relBase + item.replace(this.dirPath, '');

    // XXX
    // console.log('THIS', this);

    return {
        id:   md5File.sync(item),
        // path: item,
        url:  url,
        type: type,
        tags: []
    };
};


var storeItem = function(item){
    return this.store.addItem(item);
};

var getLastFolder = function(dirPath){
    return dirPath.split('/').pop();
};


var importer = co.wrap(function*(config){

    // Set base relative url
    // var _relBase     = config.dirPath.split('/');
    //     _relBase     = _relBase[_relBase.length - 1];
    config._relBase += '/' + getLastFolder(config.dirPath);

    // Get files in directory
    var candidates = yield readDir(config.dirPath)
        .map(file => config.dirPath + '/' + file);

    // Get folders && images
    var folders = candidates.filter(item => fs.lstatSync(item).isDirectory());
    var images  = candidates.filter(isImage).map(itemFactory.bind(config, 'image'));
    var videos  = candidates.filter(isVideo).map(itemFactory.bind(config, 'video'));

    // Import recursively?
    if(config.recursive){
        folders.forEach((folder) => {
            var _config = Object.assign(
                    {},
                    config,
                    {dirPath: folder}
                );
            importer.call(this, _config);
        });
    }

    // Store images && videos
    var collection = _.union(images, videos);
    yield collection.map(storeItem.bind(this)).map((_item) => {

    });

    // XXX
    return collection;

});

module.exports = function(config){

    // Init rel url
    config._relBase = config._relBase || '';

    // Get settings
    var settings = this.store.getSettings();

    // Define new folder settings
    var folder = {
        path: config.dirPath,
        name: _.snakeCase(getLastFolder(config.dirPath))
    };

    // Add new folder to settings?
    if(!_.find(settings.folders, folder))
        settings.folders.push(folder);

    // Persist settings
    this.store.saveSettings(settings);

    // Run importer
    return importer.call(this, config);
};