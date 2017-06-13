"use strict";
const express = require('express');
let app = express();
const orm = require('orm');
app.listen(8888);

//配置orm
app.use(orm.express("mysql://root:@127.0.0.1/first",{ //first 是数据库名字
    define: (db, models, next) => {
        models.lol = db.define("lol",{ // lol是表名
            id:{type:"serial", key:true}, //type:'serial' -> 代表自动增长，key:true -> 代表主键
            name: String,
            alias: String,
            place: String,
            info: String
        });

        next();
    }
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

//获取所有用户
app.get('/lol', function(req, res){
    req.models.lol.find({}, (err, lol)=>{ //这里用find方法，'lol'获取到的是数组
        if(err) throw err
        res.send(lol);
    });
});

//删除 -- delete?id=5
app.get("/lol/delete", (req, res) => {
    let id = req.query.id;
    req.models.lol.get(id, (err, lol) => {
        if(!lol){
            res.send({code: 0, msg:'用户不存在'});//如果根据id没有查询到内容
            return;
        };

        lol.remove((err) => {
            if(err) throw err;
            res.send({code: 1, msg: '删除成功'});
        });
    } )
});


//添加
const bodyParser = require('body-parser');// post请求获取信息，需要这个中间件

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded 告诉服务器是这种格式
app.post('/lol/create', (req, res) => {
    req.models.lol.create({
        name: req.body.name,
        alias: req.body.alias,
        place: req.body.place,
        info: req.body.info
    },(err, lol) => {
        if(err) throw err;
        res.send({code:1, lol: lol});
    });
});


//修改 //根据用户id 获取用户信息
app.get("/getuserbyid", (req, res) => {
    let id = req.query.id;//获取url上的参数，用户id
    req.models.user.get(id, (err, user) => {//根据用户id查询用户信息
        if(err) throw err;
        res.send(user);
    })
});


//修改用户
app.post("/update", (req, res) => {
    req.models.user.get(req.body.id, (err, user) => { //根据post过来的id，获取用户数据
        if(err) throw err;

        if(user) { //修改用户数据
            user.name = req.body.name;
            user.alias = req.body.alias;
            user.place = req.body.place;
            user.info = req.body.info;

            // user.uname = req.body.uname;
            // user.uage = req.body.uage;
            // user.uqq = req.body.uqq;
            // user.upwd = req.body.upwd;

            user.save();//保存数据
            res.send({code:1, user: user})
        }else{
            res.send({code:0, user: null});
        }
    })
});

