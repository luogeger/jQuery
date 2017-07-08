"use strict";

/*
*
* */
const express = require('express');
let router = module.exports = express.Router();
router.prefix = '/';

const controller = require('../controllers/home.js');
// 首页 -> blog/index.html
router.get('/', controller.index);


// 详情页 -> blog/post.html
router.get('/posts/:id', controller.blogPosts);
































































