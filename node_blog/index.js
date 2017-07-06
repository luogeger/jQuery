//判断当前要启动 开发板 还是发布版的项目
"use strict";

let env = process.env.NODE_ENV.trim();

if(env === "dev") {
    require("./src/app.js");
    console.log('---dev');
}else{
    //require("./dist/app.js");
    console.log('dist');
}

