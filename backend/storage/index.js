"use strict";

const _       = require('lodash');
const path    = require('path');
const storage = require('node-persist');

const _stores      = {};
const _collections = {};

const database = {
    collections: {
        add: function (name, storePath) {

            // Bail?
            if( name in _collections){
                throw new Error('Collection "', name, '" already exists!');
            }

            // Init store
            _stores[name] = storage.create();
            _stores[name].initSync({ dir: path.join(storePath, name)});

            // Create facade && return
            _collections[name] = buildFacade(name);
            return _collections[name];
        },

        get: function (name) {
            return _collections[name];
        }
    }
};



module.exports = function (storePath) {

    const _store = storage.create();
          _store.initSync({ dir: storePath });

    const nodes = {
        set: function (id, data) {
            _store.setItemSync(id, _buildNode(id, data));
        },

        get: function (id) {
            return _store.getItemSync(id);
        },

        remove: function (id) {
            _store.removeItemSync(id);
        },

        clear: function () {
            _store.clearSync();
        },

        nodes: function () {
            return _store.values();
        },
        
        keys: function () {
            _store.keys();
        }
    };

    const edges = {
        set: function (origin, type, target) {
            origin = _ensureType(type, origin);
            origin.edges[type].push(target.id);
            _store.setItemSync(origin.id, origin);
        },

        remove: function (origin, type, target) {
            origin.edges[type] = origin.edges[type].filter(i => i.id !== target.id);
            _store.setItemSync(origin.id, origin);
        }
    };

    function _ensureType(type, node) {
        if( !(type in node.edges) ){
            node.edges[type] = [];
        }
        return node;
    }

    function _buildNode(id, data) {
        return {
            id:    id,
            data:  data,
            edges: {}
        };
    }


    return { nodes, edges };
};


function buildFacade(store) {

}

