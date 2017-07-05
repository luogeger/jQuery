/**
 * Created by luogege on 2016.11.05.
 */

"use strict";
const express = require('express');
const xtpl = require('xtpl');

let app = express();

/*
*   设置静态资源的路径
*   前面的'www', 表示在浏览器访问的路径，端口号后面要加上www/
* */
app.use('/www',express.static('www'));


/*
*   xtpl 演示
*   访问根目录的时候，显示登陆页面
* */
app.get('/', (req, res) => {
    xtpl.renderFile('views/sign.html', (err, html) => {
        res.send(html);
    })
})




























app.listen(9990);

































