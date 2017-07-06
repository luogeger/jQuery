/**
 * Created by luogege on 2017.1.05.
 */

"use strict";
const express = require('express');
let app = express();
const path = express('path'); // 获取 当前js文件运行的绝对路径 //console.log(path);console.log(__dirname);

/*  1.
*   设置静态资源的路径
*   前面的'www', 表示在浏览器访问的路径，端口号后面要加上www
*   - 使用绝对路径
* */
// app.use('/www',express.static('www'));
app.use('/www',express.static(__dirname+'\\www'));


/*  2.
*   xtpl 演示
*   访问根目录的时候，显示sign.html
* */
const xtpl = require('xtpl');
app.get('/', (req, res) => {
    xtpl.renderFile(__dirname+'\\views/sign.html', (err, html) => {
        if(err) throw err;
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
// let files = glob.sync('./routers/*.js');
let files = glob.sync(__dirname+'\\routers/*.js'); // routers 前面不用加 ./
//console.log(files);

files.forEach((item) => {
    const router = require(item);
    //console.log(router.prefix);
    app.use(router.prefix, router);
})






























app.listen(9990);

































