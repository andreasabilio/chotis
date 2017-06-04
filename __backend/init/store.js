
var _       = require('lodash');
var path    = require('path');
var store   = require('node-persist');
var Promise = require('bluebird');


// Parse store response
var parser = function(result){
  return JSON.parse(result[0].data);
};



// Init store
store.initSync({
  encoding: 'utf8',
  dir: path.resolve(__dirname, '../storage')
});

// Init system settings?
if(!store.getItem('_settings'))
  store.setItem('_settings', {
    _system: true,
    folders: []
  });


// Store facade
var facade = {

  getItem: function(id){
    return store.getItem(id);
  },

  addItem: function(item){
    var _item = store.getItem(item.id);
    if(!_item){
      return store.setItem(item.id, item).then(result => result.data);
    }else{
      return Promise.resolve(_item);
    }
  },

  updateItem: function(id, patch){
    var stored  = store.getItem(id);
    var patched = Object.assign(stored, patch);
    return store.setItem(id, patched).then(parser);
  },

  removeItem: function(id){
    // TODO
  },

  findItem: function(query){

    var candidates    = store.values();
    var isQueryTyped  = 'type' in query;
    var isQueryTagged = 'tags' in query;

    // Remove system items
    candidates = candidates.filter(item => !('_system' in item));

    // Is a type specified?
    if(isQueryTyped){
      candidates = candidates.filter(item => query.type === item.type);
    }

    // By tags?
    if(isQueryTagged){
      candidates = candidates.filter((item) => {
        var matches = _.intersection(query.tags, item.tags || []);
        return 0 < matches.length;
      });
    }

    // Found items
    return Promise.resolve(candidates);
  },

  findPending: function(){
    var pending = store.values().filter(item => _.isEmpty(item.tags));
    return Promise.resolve(pending);
  },

  saveSettings: function(settings){
    return this.updateItem('_settings', settings);
  },
  getSettings: function(){
    return this.getItem('_settings');
  }
};


// Factory function
module.exports = function(chotis){

  // XXX
  console.log('--- running storage init');


  // Return store facade
  return facade;

};