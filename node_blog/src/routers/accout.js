"use strict";

/*
 *   __dirname 表示当前文件的 绝对路径
 * */
const express = require('express');
const controller = require('../controllers/accout')
let router = module.exports = express.Router();
router.prefix = '/login';


router.get('', controller.login)