# 文档

- MVC



- 1.app设置静态资源的位置，通过浏览器直接访问
    - 测试: http://127.0.0.1:9990/styles/style.css
    - ``pit:``路径是相对于app.js，但是文件夹下面的文件和app.js确是同级目录
    
- 2.安装模板引擎
    - ``npm i xtpl xtemplate --save`` xtpl 依赖 xtemplate
    - 访问跟目录，显示sign.html
    
- 3.bowers 管理 assets文件
    - ``bower init``
    - ``bower``是到git下载文件，所以，要用git command line
    - :``bower install jquery#1.9.1`` 希望把jquery下载到src/www/assets
        - 创建一个文件，控制bower的下载路径 ``.bowerrc``
            - ``pit:``配置 ``"directory": "src/www/assets"``

- 4.全屏背景图的切换: jquery控件 - supersized.js
     - 背景图片找不到，要改 ``supersized-init.js``里面的配置
     
- 5.创建路由，加载路由，测试路由
    - glob 加载 routers, 以及router.prefix
    - ``npm i glob --save`` 能够获取到routers里面所有文件的路径
    
- 6.配置 ``npm run dev``
    - ``set NODE_ENV=dev && node index.js`` : 环境变量是没有" "
    - ``require("./src/app.js")`` 模块被加载，就会执行这个文件
        - src 和 dist 全部用绝对路径，  
        - path.join is not a function , 改用字符串拼接 ``+``
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    