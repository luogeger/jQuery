"use strict";

let controller = module.exports;

/*
*   1.先去查询数据库
*   2.在传递给模板
*   3.在html #each 渲染
*       - 注意 each() 语法错误
*   4.时间的转换
*   5.排序 -> ['id', 'Z']
*   6.分页 -> {limit: 5}
*   user_id的子表
* */
controller.index = (req, res) => {
    req.models.post.find({}, {limit: 5} , ['id', 'Z'],  (err, posts) => {
        if(err) throw err;

        posts.forEach((item) => {
            item.created = item.created.toDateString();
        })
        res.render('blog/index', {posts: posts}, (err, html) => {
            if(err) throw err;
            res.send(html);
        })
    })

}
