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
* */
controller.loginIn = (req, res) => {
    let name = req.body.username;
    let pwd = req.body.password;
    console.log(name, pwd, '-----------------------------------');
    req.models.user.find({username: name, password: pwd}, (err, data) => {
        if(err) throw err;

        if( data && data.length > 0){
            res.send({code: 1, msg: 'success'})
        }else{
            res.send({code: 0, msg: 'error'})
        }
    })

}