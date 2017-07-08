"use strict";

let controller = module.exports;





controller.index = (req, res) => {

    res.render('blog/index', (err, html) => {
        if(err) throw err;
        res.send(html);
    })

}
