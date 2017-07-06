"use strict";

const express = require('express');
let router = module.exports = express.Router();

router.get('/admin/index', (req, res) => {
    res.send('admin - index');
})