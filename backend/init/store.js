
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

  addNew: function(item){
    if(!store.getItem(item.id))
      store.setItem(item.id, item);
  },

  update: function(id, patch){
    var stored  = store.getItem(id);
    var patched = Object.assign(stored, patch);
    store.setItem(id, patched);
    return patched;
  },

  remove: function(id){

  },

  find: function(query){

    var found         = [];
    var hasQueryId    = 'id' in query;
    var isQueryTyped  = 'type' in query;
    var isQueryTagged = 'tags' in query;


    // XXX
    // Como si fuera un patch
    // var example = {
    //   id: 'O47Y5CNO4E87YNW8UGHCNW8O74GNSCO85',
    //   name: null,
    //   path: '/some/path',
    //   format: 'png',
    //   type: 'image',
    //   tags: ['landscape', 'river', 'tree', 'sunny'],
    //   _tags: ['sunny', 'river'],
    //   date: '987465924'
    // };


    // By id?
    if(hasQueryId){
      found.push(store.getItem(query.id));
    }

    // By type?
    if(isQueryTyped){
      found.push(store.values().filter(item => query.type === item.type));
    }

    // By tags?
    if(isQueryTagged){

      // Get matching items
      var byTags = store.values().filter((item) => {

        var matches       = _.intersection(query.tags, item.tags || []);
        var isTagMatched  = 0 < matches.length;
        var isTypeMatched = query.type === item.type;

        if(isQueryTyped)
          return isTagMatched && isTypeMatched;
        else
          return isTagMatched;
      });

      // Store matched items
      found.push(byTags);
    }

    // Found items
    return found;
  }
};


// Factory function
module.exports = function(chotis){

  // XXX
  console.log('--- running storage init');


  // Return store facade
  return facade;

};