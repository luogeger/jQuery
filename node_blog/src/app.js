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
// const adminRouter = require('./routers/admin.js');
// const homeRouter = require('./routers/home.js');
//
// app.use('/admin', adminRouter);
// app.use(homeRouter);


/*  4.
*   简化加载路由的步骤
*   router里面的文件要加prefix
* */
const glob = require('glob');
let files = glob.sync('./routers/*.js');
//console.log(files);

files.forEach((item) => {
    const router = require(item);
    //console.log(router.prefix);
    app.use(router.prefix, router);
})






























app.listen(9990);

































