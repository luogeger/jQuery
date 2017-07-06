"use strict";

const express = require('express');
let router = module.exports = express.Router();
router.prefix = '/admin';

router.get('/blog/index', (req, res) => {
    res.send('blog - index');
})