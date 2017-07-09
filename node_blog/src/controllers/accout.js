"use strict";

let controller = module.exports;

// 登陆页面
controller.loginPage = (req, res) => {
    res.render('sign.html', (err, html) => {
        if(err) throw err;
        res.send(html);
    })

}

/*  登陆接口
*   1. 获取前端传来的请求数据
*   2. post请求要用 body 来解析 传过来的数据
*
*   3. 登陆成功，在当前服务器保存用户信息
*       - npm i express-session --save
*       - 然后设置 中间件
* */
controller.loginIn = (req, res) => {
    let name = req.body.username;
    let pwd = req.body.password;
    req.models.user.find({username: name, password: pwd}, (err, userInfo) => {
        if(err) throw err;

        if( userInfo && userInfo.length > 0){
            req.session.user = userInfo[0];

            res.send({code: 1, msg: 'success'})
        }else{



            res.send({code: 0, msg: 'error'})
        }
    })

}

/*  退出
*
* */
controller.loginOut = (req, res) => {
    req.session.user = null;
    res.redirect('/account/login');
}