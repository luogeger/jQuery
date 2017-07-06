"use strict";

const express = require('express');
let router = module.exports = express.Router();

router.get('/index', (req, res) => {
    res.send('index');
})