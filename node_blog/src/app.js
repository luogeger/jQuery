/**
 * Created by luogege on 2017.1.05.
 */

"use strict";
const express = require('express');
let app = express();
const path = express('path'); // 获取 当前js文件运行的绝对路径


/*  1.
*   设置静态资源的路径
*
*   app.use("/www", express.static(path.join(__dirname, "www")));
* */
// app.use(express.static(__dirname));
// app.use("/www", express.static(__dirname+"www"));
app.use('/www', express.static('www'));
/*  2.
*   xtpl 演示 -- 测试用的
*   访问根目录的时候，显示sign.html
*       - renderFile 后面表示 sign.html 的绝对路径
* */
// const xtpl = require('xtpl');
// app.get('/', (req, res) => {
//     console.log(__dirname, '----------------------------');
//     // xtpl.renderFile(__dirname+'/views/sign.html', (err, html) => {
//     xtpl.renderFile(__dirname+'/views/admin/index.html', (err, html) => {
//         if(err) throw err;
//         res.send(html);
//     })
// });


/*  3.
*   加载路由
*   - 相对app.js 找路由模块 './routers/admin.js'
*   - app.use('/admin',adminRouter); 这里加了 '/admin' 表示在后面router的路径的前面在加上 admin/
* */
// const adminRouter = require('./routers/admin.js');
// const homeRouter = require('./routers/home.js');
// app.use('/admin',adminRouter);
// app.use( homeRouter);


/*  5.
 *   因为每个 router->controller 都要用到 xtpl,
 *       简化模板 ``xtpl`` 的调用， -> 这样, controller 里面就可以直接用 res.render()
 *   app.set('views', './views'); -- 设置模板的路径
 * */
const xtpl = require('xtpl');
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', xtpl.renderFile);


/*  6.
 *   配置orm, 创建对象和表的映射
 *       - 1.在app.js中国创建连接，导入映射
 *       - 2.控制器中获取数据
 *          - app.use()是中间件， 执行以后，req.db , req.models
 *       - 3.中间件的设置要放在路由加载之前
 * */
const orm = require('orm')
app.use(orm.express('mysql://root:@localhost:3306/my_blog',{
    define: function (db, models, next){
        // ---------  这里的代码，放到models/model里面了

        const model = require('./models/model');
        model(db, models);
        next();
    }
}))

/*  9.
*   处理application/x-www-form-urlencoded的 parser
*   此值的含义：post过来数据的格式是这个样子  id=5&name=zs
* */
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));


/*  10.
*   设置 session
* */
const session = require('express-session');
app.use(session({
    secret: '12345',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}));


/*  4.
*   简化加载路由的步骤
*       router里面的文件要加prefix -> 它的作用是区分路由
*       files是routers里面所有js文件的绝对路径
* */
const glob = require('glob');
let files = glob.sync(__dirname+'\\routers/*.js');

files.forEach((item) => {
    const router = require(item);
    app.use(router.prefix, router);
})



/*  7.
*   配置orm 以后，home/index.html里面的数据换成数据库的数据
* */

/*  8.
*   首页
* */


















app.listen(9990);

































