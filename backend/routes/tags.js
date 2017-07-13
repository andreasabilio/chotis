"use strict";

const deepMerge = require('deepmerge');
const express   = require('express');
const router    = express.Router();

module.exports = function(store){

    router.get('/', (req, res) => {
        res.json(store.values());
    });

    router.get('/:id', (req, res) => {
        res.json(store.getItemSync(req.params.id));
    });

    router.patch('/:id', (req, res) => {
        const item = store.getItemSync(req.params.id);
        const updated = deepMerge(item, req.body);
        store.setItemSync(req.params.id, updated);
        res.json(updated);
    });

    router.delete('/:id', (req, res) => {
        store.removeItemSync(req.params.id);
        res.sendStatus(200);
    });

    return router;
};