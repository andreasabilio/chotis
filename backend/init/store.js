
var _     = require('lodash');
var path  = require('path');
var store = require('node-persist');


// Init store
store.initSync({
  ttl: 3000,
  dir: path.resolve(__dirname, '../storage')
});


// Store facade
var facade = {

  getItem: store.getItem,

  addItem: function(item){
    var _item = store.getItem(item.id);
    if(!_item){
      store.setItem(item.id, item);
      return item;
    }else{
      return _item;
    }
  },

  updateItem: function(id, patch){
    var stored  = store.getItem(id);
    var patched = Object.assign(stored, patch);
    store.setItem(id, patched);
    return patched;
  },

  removeItem: function(id){
    // TODO
  },

  findItem: function(query){

    var candidates    = store.values();
    var isQueryTyped  = 'type' in query;
    var isQueryTagged = 'tags' in query;

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
    return candidates;
  },

  findPending: function(){
    return store.values().filter(item => _.isEmpty(item.tags));
  }
};


// Factory function
module.exports = function(chotis){

  // XXX
  console.log('--- running storage init');


  // Return store facade
  return facade;

};