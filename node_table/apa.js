"use strict";

const express = require('express');
let app = express();
const orm = require('orm');
app.listen(9999);

// 1.配置orm
app.use(orm.express("mysql://root:@127.0.0.1/first",{ //first 是数据库名字
    define: (db, models, next) => {
        //req.models.luo.get/post, 请求都是同models.luo这个对象
        models.luo = db.define("lol",{ //model.luo -> 这个luo就是"lol"后面的这个对象，-- "lol"是表名
            id:{type:"serial", key:true}, //type:'serial' -> 代表自动增长，key:true -> 代表主键
            name: String,
            alias: String,
            place: String,
            info: String
        });

        next();
    }
}));

// 6.解决跨域
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// 2.获取所有用户
app.get("/allUser", (req, res) => {
    req.models.luo.find({}, (err, lol)=>{ //这里用find方法，'lol'获取到的是数组
        if(err) throw err
        res.send(lol);
    });
});

// 3.删除用户 //根据 id 删除, 先根据id找到这个对象，在调用这个对象remove()方法删除
app.get('/delete', (req, res) => { //res就是id对应的对象吗？？
    let id = req.query.id;

    req.models.luo.get(id, (err, arr) => {
        if(!arr){ //如果传过来的id，没有对应的数据，arr为Undefined
            res.send({code: -1, msg: '删除失败'});
            return; // 这行代码很容易忘记
        }
        arr.remove( (err) => {
            if(err) throw err;
            res.send({code:1, msg:'删除成功'});
        })
    })
});


// 4.添加用户 // post请求是要content-type, 告诉服务器传过去的数据是什么格式(样子)
const bodyParse = require('body-parser'); // get请求是express框架帮我们解析，放在了query这个对象里，但是post请求需要一个中间件来处理 - body-parser
app.use(bodyParse.urlencoded({ extended: false })); // 这行代码在干什么？ 当 content-type 为 application/x-www-form-urlencoded 类型时, 才解析数据
app.post('/create', (req, res) => {
    req.models.luo.create({
        name: req.body.name,
        alias: req.body.alias,
        place: req.body.place,
        info: req.body.info
    }, (err, obj) => {
        if(err) throw err;
        res.send({ code: 1, msg: '添加成功'});
    })


});


// 5.修改用户
// 5.1 根据用户id, 发请求拿到数据, 渲染到弹窗
app.get('/getUserById', (req, res) => {
   let id = req.query.id;

   req.models.luo.get(id, (err, obj) => {
       if(!obj){
           res.send({ code: -1, msg: '没有对应的用户'})
           return;
       }
       res.send(obj);
   })
});


// 5.2 然后在发请求, 保存数据 //不能用all, 因为不知道如何获取数据
app.post('/update', (req, res) => {// 和delete一样, 先从数据库拿到obj, 在把页面的数据assign给obj
    let id = req.body.id; //post请求要同过middleware获取, 再通过id拿到obj

    req.models.luo.get(id, (err, obj) => {
        if( obj ){
            obj.name = req.body.name,
                obj.alias = req.body.alias,
                obj.place = req.body.place,
                obj.info = req.body.info

            obj.save(); //再保存数据
            res.send({ code: 1, msg: '修改成功'});
        }
        else{
            res.send({ code: 0, mdg: null});
        }


    })


})



/*
*   7.jsonP解决跨域
* */


/*
*   8.用户出现异常数据, 服务器就挂了
* */
    // 服务器开启只有一个node进程, 有了守护进程, 就相当于一个web服务器开启了2个node进程
    // cannot set property 'name' of undefined, -> 判断从数据库拿回来的obj 有没有值


/*
*   9.排序
* */

app.get('/sort', (req, res) => {
    let column = req.query.c;
    let sort = req.query.s;

    req.models.luo.find({}, [column, sort], (err, obj) => {
        if(err) throw err;
        res.send(obj)
    })

})
