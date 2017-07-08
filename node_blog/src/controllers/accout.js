"use strict";

let controller = module.exports;

controller.login = (req, res) => {
    res.render('sign', (err, html) => {
        if(err) throw err;
        res.send(html);
    })

}
