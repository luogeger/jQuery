/**
 * Created by luogege on 2017.1.05.
 */

"use strict";
const express = require('express');
let app = express();

/*  1.
*   设置静态资源的路径
*   前面的'www', 表示在浏览器访问的路径，端口号后面要加上www/
* */
app.use('/www',express.static('www'));


/*  2.
*   xtpl 演示
*   访问根目录的时候，显示sign.html
* */
const xtpl = require('xtpl');
app.get('/', (req, res) => {
    xtpl.renderFile('views/sign.html', (err, html) => {
        res.send(html);
    })
});


/*  3.
*   加载路由
* */

const adminRouter = require('./routers/admin.js');
const homeRouter = require('./routers/home.js');

app.use(adminRouter);
app.use(homeRouter);




























app.listen(9990);

































