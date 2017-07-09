"use strict";


/*
 *  get后面的是路径
 * */
const express = require('express');
const controller = require('../controllers/admin');
let router = module.exports = express.Router();
router.prefix = '/admin';

router.get('/posts/index', controller.postsPage)
























































