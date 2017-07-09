"use strict";

/*
 *   __dirname 表示当前文件的 绝对路径
 * */
const express = require('express');
const controller = require('../controllers/accout')
let router = module.exports = express.Router();
router.prefix = '/account';

// 显示登陆首页
router.get('/login', controller.loginPage)


/*  登陆接口
*       - post 请求
* */
router.post('/login', controller.loginIn)


/*  退出接口
*       - get
* */
router.get('/loginOut', controller.loginOut)