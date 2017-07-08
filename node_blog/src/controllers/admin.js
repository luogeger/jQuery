"use strict";

let controller = module.exports;

controller.admin = (req, res) => {

    res.render('admin/index', (err, html) => {
        if(err) throw err;
        res.send(html);
    })
}
