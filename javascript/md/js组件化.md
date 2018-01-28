## 组件化

> 实现一个组件，一个输入框里面字数的计数。

- 本文出处[这里](https://github.com/purplebamboo/blog/issues/16)

#### 最简陋的写法
```javascript
    $(function () {
        var input = $('#J_input');
        //用来获取字数
        function getNum() {
            return input.val().length;
        }
    
        //渲染元素
        function render() {
            var num = getNum();
            //没有字数的容器就新建一个
            if ($('#J_input_count').length === 0) {
                input.after('<span id="J_input_count"></span>');
            }
            ;
            $('#J_input_count').html(num + '个字');
        }
    
        //监听事件
        input.on('keyup', function () {
            render();
        });
        //初始化，第一次渲染
        render();
    })
```
```
这段代码跑也是可以跑的，但是呢，各种变量混乱，
没有很好的隔离作用域,当页面变的复杂的时候,会很难去维护。目前这种代码基本是用不了的。
```


#### 作用域隔离
```javascript
    var textCount = {
        input:null,
        init:function(config){
            this.input = $(config.id);
            this.bind();
            return this;//这边范围对应的对象，可以实现链式调用
        },
    
        bind:function(){
            var self = this;
            this.input.on('keyup',function(){
                    self.render();
                });
        },
    
        getNum:function(){
            return this.input.val().length;
        },
    
        //渲染元素
        render:function(){
            var num = this.getNum();
            if ($('#J_input_count').length === 0) {
                this.input.after('<span id="J_input_count"></span>');
            };
    
            $('#J_input_count').html(num+'个字');
        }
    };

    $(function() {
        textCount.init({id:'#J_input'}).render();
    })
```

``` 
这样一改造，立马变的清晰了很多，所有的功能都在一个变量下面。
代码更清晰，并且有统一的入口调用方法。

但是还是有些瑕疵，这种写法没有私有的概念，
比如上面的getNum,bind应该都是私有的方法。但是其他代码可以很随意的改动这些。
当代码量特别特别多的时候，很容易出现变量重复，或被修改的问题。
```



#### 函数闭包写法

```javascript
    var TextCount =
        (function(){ //私有方法,
            var TextCountFun =
                function(config){

                };

            var _bind =
                function(that){
                    that.input.on('keyup',function(){
                        that.render();
                    });
                };

            var _getNum =
                function(that){
                    return that.
                    input.val().length;
                };

            TextCountFun.prototype.init =
                function(config) {
                    this.input = $(config.id);
                    _bind(this);
                    return this;
                };

            TextCountFun.prototype.render
                = function() {
                var num = _getNum(this);
                if ($('#J_input_count').length === 0){
                    this.input.after('<span id="J_input_count"></span>');
                };

                $('#J_input_count').html(num+'个字');
            };  //返回构造函数

            return TextCountFun;
        })();

    $(function(){
        new TextCount().init({id:'#J_input'}).render();
    })
```
``` 
这种写法，把所有的东西都包在了一个自动执行的闭包里面，所以不会受到外面的影响，
并且只对外公开了TextCountFun构造函数，生成的对象只能访问到init,render方法。
大部分的jQuery插件都是这种写法。
```






#### 面向对象
``` 
当一个页面特别复杂，当我们需要的组件越来越多，当我们需要做一套组件。
仅仅用这个就不行了。首先的问题就是，这种写法太灵活了，写单个组件还可以。
如果我们需要做一套风格相近的组件，而且是多个人同时在写。那真的是噩梦.
因为javascript不支持class的定义，但是可以模拟                                                   
```

```javascript
    var Class =
    (function () {
        var _mix =
        function (r, s) {
            for (var p in s) {
                if (s.hasOwnProperty(p)) {
                    r[p] = s[p]
                }
            }
        };// mix


        var _extend =
        function () {
            // 开关 用来使生成原型时，不调用真正的构成流程init
            this.initPrototype = true;
            var prototype = new this();
            this.initPrototype = false;


            var items = Array.prototype.slice.call(arguments) || [];
            var item;

            // 支持混入多个属性，并且支持{}，也支持Function
            while (item = items.shift()) {
                _mix(prototype, item.prototype || item);
            }


            // 这是返回的类，其实是返回的子类
            function SubClass () {
              if (!SubClass.initPrototype && this.init)
                this.init.apply(this, arguments)// 调用init真正的构造函数
            }

            // 赋值原型链，完成继承
            SubClass.prototype = prototype;
            
            // 改变constructor引用
            SubClass.prototype.constructor = SubClass;
            
            // 为子类也添加extend方法
            SubClass.extend = _extend;
            
            return SubClass;

        };// extend
        
        var Class = function () {};// 超级父类
        Class.extend = _extend;// 为超级父类添加extend方法
        
        return Class;
        
    })();
    
    // ===========================
    // 继承超级父类， 生成子类Animal, 并且混入一些方法。这些方法在Animal原型上
    // 不仅支持混入{}, 还支持Function
    var Animal =
    Class.extend({
        init: function (options) {
            this.msg = options.msg;
            this.type = "animal";
        },

        say: function () {
            console.log(this.msg + "! I'am a " + this.type);
        },
    })// Animal

    var Dog = Animal.extend({
        init: function (options) {
            Animal.prototype.init.call(this, options);
            this.type = "dog";
        }
    })// Dog

    new Dog({msg: 'hi'}).say()
    
```

``` 
使用很简单，超级父类具有extend方法，可以继承出一个子类。子类也具有extend方法。
这边要强调的是，继承的父类都是一个也就是单继承。但是可以通过extend实现多重混入。
有了这个类的扩展， 实现代码如下
```

```javascript
    var TextCount = Class.extend({
        init:function(config){
            this.input = $(config.id);
            this._bind();
            this.render();
        },

        render:function() {
            var num = this._getNum();

            if ($('#J_input_count').length == 0) {
                this.input.after('<span id="J_input_count"></span>');
            };

            $('#J_input_count').html(num+'个字');

        },

        _getNum:function(){
            return this.input.val().length;
        },
        
        _bind:function(){
            var self = this;
            self.input.on('keyup',function(){
                self.render();
            });
        }
    });

    $(function() {
        new TextCount({
            id:"#J_input"
        });
    })

```


#### 抽象出Base
面向对象的好处是抽象出一个Base类。其他组件编写时都继承它。
-  ``init`` 用来初始化属性
-  ``render`` 用来处理渲染的逻辑
-  ``bind`` 用来处理事件的绑定

```javascript
    // 抽象出Base类的实现代码如下
    var Base = Class.extend({
        init: function (config) {
            // 自动保存配置项
            this._config = config;
            this.bind();
            this.render();
        },
        
        // get获取配置项 
        get: function (key) {
            return this._config[key];
        },
        
        // set设置配置项
        set: function (key, value) {
            this._config[key] = value;
        },
        
        bind: function () {
            
        },
        
        render: function () {
            
        },
        
        destroy: function () {
            // 定义销毁的方法
        }
        
    })// Base


    // ===========================
    var TextCount = Base.extend({
        _getNum:function(){
            return this.get('input').val().length;
        },
        bind:function(){
            var self = this;
            self.get('input').on('keyup',function(){
                self.render();
            });
        },
        render:function() {
            var num = this._getNum();

            if ($('#J_input_count').length === 0) {
                this.get('input').after('<span id="J_input_count"></span>');
            };

            $('#J_input_count').html(num+'个字');

        }
    });

    $(function() {
        new TextCount({input:$("#J_input")});
    })
```
- 直接实现一些固定的方法，bind，render就行了。其他的base会自动处理（这里只是简单处理了配置属性的赋值）。
- 这里的init，bind，render就已经有了点生命周期的影子，组件都会具有这几个阶段，初始化，绑定事件，渲染。还可以加一个destroy销毁的方法，用来清理现场。