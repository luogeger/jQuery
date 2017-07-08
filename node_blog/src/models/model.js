"use strict";

module.exports = (db, models) => {

    models.post = db.define("posts", {
        id: { type: 'serial', key: true },
        slug: String,
        title: String,
        excerpt: String,
        content: String,
        status: String,
        comment_status: String,
        comment_count: Number,
        view_count: Number,
        created: Date,
        user_id: Number,
        parent_id: Number,
        type: String
    });

    models.user = db.define("users",{
        id: { type: 'serial', key: true },
        slug: String,
        username: String,
        password: String,
        nickname: String,
        email: String,
        status: String,
        created: Date,
        role: String,
        token: String
    });

    models.comment = db.define("comments",{
        id: { type: 'serial', key: true },
        author: String,
        author_email: String,
        author_ip: String,
        content: String,
        status: String,
        support: Number,
        oppose: Number,
        created: Date,
        post_id:Number,
        parent_id: Number,
        user_id: Number
    });
}