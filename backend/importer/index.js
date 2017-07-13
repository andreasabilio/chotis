"use strict";

const _       = require('lodash');
const fs      = require('fs');
const path    = require('path');
const isDir   = require('is-dir');
const isImage = require('is-image');
const isVideo = require('is-video');
const md5File = require('md5-file');


const readDir = function(dirPath){
    return fs.readdirSync(dirPath)
        .map(i => path.join(dirPath, i))
        .reduce(walker, []);
};

const walker = function(out, filePath){
    if(isDir(filePath)){
        out = _.union(out, readDir(filePath));
    }else{
        out.push(filePath);
    }

    return out;
};

const addMedia = function(filePath, store){
    const hash = md5File.sync(filePath);
    const data = {
        path: filePath,
        name: path.basename(filePath, path.extname(filePath)),
        tags: []
    };

    store.setItemSync(hash, data);
};


module.exports = function(importPath, storage){

    readDir(importPath).forEach(filePath => {
        if(isImage(filePath)){
            addMedia(filePath, storage.images);
        }else if(isVideo(filePath)){
            addMedia(filePath, storage.videos);
        }
    });
};

