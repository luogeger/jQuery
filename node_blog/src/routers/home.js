"use strict";

/*
*
* */
const express = require('express');
const controller = require('../controllers/home.js');

let router = module.exports = express.Router();
router.prefix = '/';


router.get('', controller.index);

































































