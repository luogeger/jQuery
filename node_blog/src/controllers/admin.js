"use strict";

let controller = module.exports;

/*
*   判断用户是否登陆，在决定 登陆 or 跳转
*       - req.session.user 是否有值
* */
controller.postsPage = (req, res) => {

    if(req.session.user){
        res.render('admin/index', {user: req.session.user} , (err, html) => {
            if(err) throw err;
            res.send(html);
        })
    }
    else{
        //res.redirect('/account/login');
        res.send("<script>alert('请先登陆');location.href = '/account/login';</script>")
    }
}
