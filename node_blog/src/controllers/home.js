"use strict";

let controller = module.exports;

/*  首页 -> blog/index.html
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


/*  详情页 -> blog/post.html
*   1. 根据id 查找内容 -> 要用 get 不能用 find
*   2. 设置时间 -> 但是注意没有时间这个字段
* */
controller.blogPosts = (req, res) => {
    let id = req.params.id;
    req.models.post.get(id, (err, post) => {
        if(err) throw err;

        if(post.created){
            post.created = post.created.toDateString();
        }


        res.render('blog/post', {post: post} , (err, html) => {
            if(err) throw err;
            res.send(html);
        })
    })
}