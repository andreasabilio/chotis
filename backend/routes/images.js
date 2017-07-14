"use strict";

const fse     = require('fs-extra');
const express = require('express');
const router  = express.Router();

module.exports = function(model){

    router.get('/', (req, res) => {
        res.json(model.values());
    });

    router.get('/:id', (req, res) => {
        res.json(model.getItemSync(req.params.id));
    });

    router.put('/:id', (req, res) => {
        model.setItemSync(req.params.id, req.body);
        res.json(req.body);
    });

    router.patch('/:id', (req, res) => {
        const item = model.getItemSync(req.params.id);
        const updated = Object.assign(item, req.body);
        model.setItemSync(req.params.id, updated);
        res.json(updated);
    });

    router.delete('/:id', (req, res) => {
        const item = model.getItemSync(req.params.id);
        model.removeItemSync(req.params.id);
        // TODO
        // fse.removeSync(item.path);
        res.sendStatus(200);
    });

    return router;
};