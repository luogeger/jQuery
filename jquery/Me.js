
(function () {

    var Me = function (selector, context) {
        return new Me.fn.init(selector, context);
    };
//1. 创建原型对象上面的构造函数
    Me.fn = Me.prototype = {
        constructor: Me,
        init: function (selector, context) {
            if (!selector) {
                return this;
            }
            else if (Me.isString(selector)) {
                if (selector.charAt[0] !== "<") {
                    [].push.apply(this, select(selector, context));
                    this.selector = selector;
                }
                else {
                    [].push.apply(this, parseHTML(selctor));
                }
            }
            else if (Me.isDOM(selector)) {
                this[0] = selector;
                this.length = 1;
            }
            else if (Me.isMe(selector)) {
                return selector;
            }
            else if (Me.isArrayLike(selector)) {
                [].push.apply(this, selector);
            }
            return this;
        },
        selector: ""
    };

//2. 修改原型链指向
    Me.fn.init.prototype = Me.prototype;

//3. htmlString 要转换成 dom数组
    var parseHTML = function (html) {
        var tempDIV = document.createElement("div");
        tempDIV.innerHTML = html;
        var allNodes = tempDIV.childNodes;
        var arr = [];
        for (var i = 0, len = allNodes.length; i < len; i++) {
            arr.push(allNodes[i]);
        }
        return arr;
    };

//4. 扩展功能
    Me.extend = Me.fn.extend = function (obj) {
        var key;
        for (key in obj) {
            this[key] = obj[key];
        }
    };
    //5.0 mrTrim() 静态成员添加--> 可以放在each() 之后
    Me.extend({
        myTrim:function (str) {
            // 判断兼容性条件--> 在原型上找，看支不支持
            if (String.prototype.trim) {
                return str.trim();
            }

            return str.replace(/^\s+|\s+Me/g, "");
        }
    });

//5.1 each() 静态成员添加
    Me.extend({
        each: function (obj, callback) {
            var i, length = obj.length;
            if (Me.isArrayLike(obj)) {
                for (i = 0; i < obj.length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
        }
    });

//5.2 each() 实例成员添加
    Me.fn.extend({
        each: function (callback) {
            Me.each(this, callback);
        }
    });

//6. 判断模块 的扩展
    Me.extend({
        isString: function (obj) {
            return typeof obj === "string";
        },
        isDOM: function (obj) {
            return !!obj.nodeType;
        },
        isMe: function (obj) {
            return "selector" in obj;
        },
        isArrayLike: function (obj) {
            return "length" && obj.length >= 0;
        },
        isFunction: function (obj) {
            return typeof obj === "function";
        }
    });

// 调用方法模块
    //next()的方法
    var getNextElement = function(node){
        while((node = node.nextSibling) != null){
            if(node.nodeType === 1){
                return node ;
            }
        }
    };

    //nextAll()的方法：--> 改变each了
    var getNextElements = function(node){
        var retArr = [];
        while(node = node.nextSibling){
            if(node.nodeType === 1){
                retArr.push(node);
            }
        }
        return retArr;
    };

//first,second-->Selector and DOM module
    Me.fn.extend({
        appendTo: function (selector) {
            var tarElements = Me(selector), srcElements = this, res = [];

            tarElements.each(function (i, v) {
                srcElements.each(function () {
                    var src = (i === tarElements.length - 1) ? this : this.cloneNode(true);
                    v.appendChild(src);
                    res.push(src);
                })
            });
            return Me(res);
        },

        append: function (selector) {
            var srcElements = Me(selector);
            srcElements.appendTo(this);
        },

        prependTo: function (selector) {
            var tarElements = Me(selector), srcElements = this;

            tarElements.each(function (i, v) {
                var refChild = v.firstChild;
                srcElements.each(function () {
                    v.insertBefore((i === tarElements.length - 1 ? this : this.cloneNode(true)), refChild )
                })
            })
        },

        prepend: function (selector) {
            var srcElements = Me(selector);
            srcElements.prependTo(this);
        },

        remove: function () {
            return this.each(function(){
                this.parentNode.removeChild(this);
            })
        },

        next:function(){
            var temp = null;
            var tempArr = [];

            this.each(function(){
                temp = getNextElement(this);
                if( temp !== null){
                    tempArr.push(temp);
                }
            });
            return Me(tempArr);
        },

        nextAll:function(){
            var tempArr = [];
            var tempNodes = null;

            this.each(function(){
                tempNodes = getNextElements(this);
                tempArr = tempArr.concat(tempNodes);
            });
            return Me(tempArr);
        }
    });

//third-->Event module
    var eventNameList = ("click,dblclick,mouseevent,mouseleave,mouseover,mouseout" +
    "mousedown,mouseup,keydown,keyup,keypress" +
    "focus,blur,change,load,scroll,resize").split(",");

    Me.each(eventNameList,function(index,value){
        Me.fn[value] = function(handler){
            this.on(value,handler);
            return this;
        }
    });

    var bindEventList = [];

    Me.fn.extend({
        on:function(eventName,handler){
            this.each(function(){
                var self = this;
                if(window.addEventListener){
                    this.addEventListener(eventName,handler);
                }
                else if(window.attachEvent){
                    var fn = function(event){
                        handler.call(self,event);
                    };
                    this.attachEvent("on" + eventName,fn);
                    bindEventList.push(fn);
                }
                else{
                    var oldHandler = this["on" + eventName];
                    if(typeof oldHandler !== "function"){
                        this["on" + eventName] = function(event){
                            event = event || window.event;
                            handler.call(self,event);
                        };
                    }
                    else{
                        this["on" + eventName] = function(event){
                            event = event || window.event;
                            oldHandler.call(self,event);
                            handler.call(self,event);
                        };
                    }
                }
            });
            return this;
        },

        off:function(eventName,handler){
            this.each(function(){
                if(window.removeEventListener){
                    this.removeEventListener(eventName,handler);
                }
                else if(window.detachEvent){
                    for(var i = 0; i < bindEventList.length; i++){
                        this.detachEvent("on" + eventName,bindEventList[i]);
                    }
                }
                else{
                    this["on" + eventName] = null;
                }
            });
            return this;
        }
    });//-- event end;

//fourth--> CSS
    Me.fn.extend({
        removeClass:function(name){
            this.each(function(){
                var cName = " " + this.className + " ";
                cName = Me.myTrim( cName.replace(" " + name + " "," "));
                this.className = cName;
            });
        },

        addClass:function(name){
            this.each(function(){
                if(!Me(this).hasClass(name)){
                    var cName = this.className;
                    cName += " " + name;
                    this.className = Me.myTrim(cName);
                }
            });
            return this;
        },

        hasClass:function(name){
            var has = false;// 记录有没有类
            this.each(function(){
                if((" " + this.className + " ").indexOf(" " + name + " ") > -1){
                    has = true;// 有一个类满足条件，后面就不用判断了
                    return false;
                }
            });
            return has;
        },

        toggleClass:function(name){
            //1.有就删除，没有就添加
            //2.hasClass 找到一个就不找了，返回true
            //3.需要使用each进行循环，分别进行判断
            return this.each(function(){
                var iObj = Me(this);
                if(iObj.hasClass(name)){
                    iObj.removeClass(name);
                }
                else{
                    iObj.addClass(name);
                }
            });
        }

    });// css end;

//fifth--> property
    Me.fn.extend({
        attr:function(name,value){
            if(typeof value === "undefined"){
                return this[0].getAttribute(name);
            }
            return this.each(function(){
                this.setAttribute(name,value);
            });
        },

        val: function(v) {
            // 设置内容
            if(typeof v !== "undefined") {
                return this.each(function() {
                    this.value = v;
                });
            }

            // 读取内容
            return this[0].value;
        },

        html: function(htmlString) {
            // 判断有没有传入参数
            // if(htmlString === undefined) {
            if(typeof htmlString === "undefined") {
                // 表示获取内容
                return this[0].innerHTML;
            }

            // 设置
            return this.each(function() {
                // 根据传入的内容来设置html
                this.innerHTML = htmlString;
            });
        },

        text: function(txtString) {
            var arr = [];
            // 1 判断有没有传入参数
            if(typeof txtString === "undefined") {
                // 获取内容
                if("textContet" in this[0]) {
                    this.each(function() {
                        arr.push( this.textContet );
                    });
                } else {
                    this.each(function() {
                        // getTextContent 这个方法的返回值是一个字符串
                        arr.push( getTextContent(this) );
                    });
                }

                return arr.join("");
            }

            // 传入参数，设置内容
            if("textContet" in this[0]) {
                this.each(function() {
                    this.textContent = txtString;
                });
            } else {
                // 如果不支持 textContent 该怎么设置文本内容？？
                // 思路：
                // 1 清空该元素的所有内容
                // 		innerHTML = "";
                // 2 创建文本节点
                // 3 将文本节点追加到当前元素中
                this.each(function() {
                    this.innerHTML = "";
                    var txtNode = document.createTextNode(txtString);
                    this.appendChild(txtNode);
                });
            }

            return this;
        }

    });// property end

//sixth--> animation
    // 动画操作模块
    // 使用第三方的动画函数
    var easingObj = {
        fn: function(x, t, b, c, d) {
            var a = 2 * (c - b) / (d * d), // 加速度
                v0 = a * d,					// 初始速度
                tween = 0;

            tween = v0 * t - 1/2 * a * t * t;
            return tween;
        },
        linear: function(x, t, b, c, d) {
            var v0 = (c - b) / d,	// 速度
                tween = t * v0;

            return tween;
        },
        // t: current time, b: beginning value, c: change in value, d: duration
        easeinQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeoutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeinoutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeinCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeoutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeinoutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeinQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeoutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeinoutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeinQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeoutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeinoutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeinSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeoutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeinoutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeinExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeoutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeinoutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeinCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeoutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeinoutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeinElastic: function (x, t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeoutElastic: function (x, t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeinoutElastic: function (x, t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeinBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeoutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeinoutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeoutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        }
    };

    // 样式属性的键值对
    var styleKV = {
        left: "offsetLeft",
        top: "offsetTop",
        width: "offsetWidth",
        height: "offsetHeight"
    };

    // 1 获取起始位置的函数
    var getStartPosition = function(dom, target) {
        // 对象用来存储
        var obj = {};
        for(var k in target) {
            obj[k] = dom[ styleKV[k] ];
        }

        return obj;
    };

    // 2 获取移动的距离（路程）
    var getTotalDistance = function(dom, target) {
        var obj = {};

        for(var k in target) {
            obj[k] = target[k] - dom[ styleKV[k] ];
        }

        return obj;
    };

    // 3 封装获取路程的函数
    var getTweens = function(x, passingTime, starts, target, duration, easingName) {
        var obj = {};

        for(var k in target) {
            obj[k] = easingObj[easingName](x, passingTime, starts[k], target[k], duration);
        }

        return obj;
    };

    // 4 封装设置样式的函数
    var setStyle = function(dom, starts, tweens, target) {
        // dom.style.left = startX + tweenX + "px";
        for(var k in target) {
            dom.style[k] = starts[k] + tweens[k] + "px";
        }
    };


    var animate = function(dom, target, duration, easingName) {
        // 现在 target 是一个对象

        // 声明需要的变量
        var startLocations = getStartPosition(dom, target),	// 获取所有的起始位置
            totalDistances = getTotalDistance(dom, target),	// 获取总的移动距离（路程）


            startTime = +new Date(),			// 动画开始的时间
            passingTime = 0,					// 经过的时间
            timerId = null;						// 定时器id

        var play = function() {
            var tweens = 0;						// 经过的路程
            // 经过的时间
            passingTime = +new Date() - startTime;

            // 判断经过的时间 是否达到目标值
            if(passingTime >= duration) {
                tweens = totalDistances;

                clearInterval(timerId);
            } else {
                // 计算当前移动的路程
                // t: current time, b: beginning value, c: change in value, d: duration
                tweens = getTweens(null, passingTime, startLocations, target, duration, easingName);
            }

            setStyle(dom, startLocations, tweens, target);
        };
        play();

        timerId = setInterval(play, 25);
    };

    // 动画模块的核心函数
    Me.fn.extend({
        animate: function(target, duration, easingName) {
            return this.each(function() {
                animate(this, target, duration, easingName);
            });
        }
    });

    // 对外开放 选择器模块 - select - 再把init函数里面的select(selector,context)--> Me.select(sele,con);
    //引用Sizzle,再重新赋值：Me.select = Sizzle;
    //Me.extend({
    //    select: select
    //});



//二、选择器模块

    var select = (function () {
//1. 兼容性判断 以及 处理，模块
        var support = {};
        //1.1 className
        support.getClassName = function () {
            var rnative = /^[^{]+\{\s*\[native \w/;
            return rnative.test(document.getElementsByClassName);
        }();
        //1.2 trim()--> 封装在外面,添加静态属性了。Me.trim();
        support.trim = !!String.prototype.trim;

        // IE8中 兼容 push 方法
        var push = [].push;
        try {
            // 判断 push 是否可用
            var container = document.createElement("div");
            container.innerHTML = "<p></p><p></p>";
            push.apply([], container.childNodes);
        }
        catch(e) {
            // push不可用，则自己实现
            push = {
                apply: function(target, els) {
                    // 将第二个参数中的内容 添加到第一个参数中去
                    // target : [1, 3, 5]
                    // els:     ["a", "b"]
                    var j = target.length;
                    i = 0;
                    while(target[j++] = els[i++]) {}
                    // target[3] = els[0]
                    // target[4] = els[1]
                    target.length = j - 1;
                }
            };
        }
        finally {
            container = null;
        }

//2. getId
        var getId = function (id,context, results) {
            results = results || [];
            var node = document.getElementById(id);
            if (node != null) {
                results.push(node);
            }
            return results;
        };

//3. getTag
        var getTag = function (tagName,context, results) {
            results = results || [];
            results.push.apply(results, context.getElementsByTagName(tagName));
            return results;
        };

//4. getClass
        var getClass = function (cName,context, results) {
            results = results || [];
            if (support.getClassName) {
                results.push.apply(results, context.getElementsByClassName(cName));
            }

            var allNodes = context.getElementsByTagName("*");
            Me.each(allNodes, function (index, value) {
                if ((" " + value.className + " ").indexOf(" " + cName + " ") > -1) {
                    results.push(value);
                }
            });
            return results;
        };

//5. get合并
        var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w-]+))Me/;
        var get = function (selector, context, results) {
            results = results || [];
            context = context || document;
            var m = rquickExpr.exec(Me.myTrim(selector));
            //5.1 contex的判断
            if (typeof context === "string") {
                context = get(context);
            }
            if (context.nodeType) {
                context = [context];
            }

            if (m !== null) {
                if (m[1]) {
                    results = results.concat(getId(m[1]));
                }
                else {
                    Me.each(context, function (index, value) {
                        if (m[2]) {
                            results = results.concat(getClass(m[2], this));
                        }
                        else {
                            results = results.concat(getTag(m[3], this));
                        }
                    })
                }
            }
            return results;
        };

//6. select
        var select = function (selector, context, results) {
            results = results || [];
            context = context || document;

            var singleString = Me.myTrim(selector).split(",");
            Me.each(singleString, function (index, value) {
                    var c = context;
                    Me.each(Me.myTrim(value).split(" "), function (index, value) {
                        if (value !== "") {
                            c = get(value, c);
                        }
                    });

                    results = results.concat(c);
                }
            );
            return results;
        };
        return select;
    })();//-- select end

    window.Me = Me;// 暴露
})();//--END


//要把接受到的形参，经过处理然后再返回出去，返回去的是一个对象
//形参数据类型复杂要判断
//判断类型有很多种，判断方法可以全部放在一个模块里面
//1.不合法值
//2.字符串的判断：还分为选择器和  创建DOM元素
//3.DOM对象的判断
//4.Me类型
//5.伪数组或者数组
//6.return this
//改变原型链的指向
//其中创建DOM元素的方法 -- 要单独的声明
//
//框架扩展功能-- 同时赋值给 构造函数和原型对象
// 通过扩展功能 添加each方法 到静态和实例
//  再添加，判断形参数据类型的 模块-->原型对象Me.fn
//
//
// 选择器模块
// 上来就先做兼容性的判断和处理，把他们都挂在一个对象中，这个对象是专门做这个事情的support
// ClassName  和 trim
// 有的要只进行判断，等用的时候在进行处理。有的当场就判断直接处理，用的时候直接调用，因为作为判断条件，返回的就是false , true
// 然后3个get方法，功能很单一，你传进来给我，我就用自己的方式去处理，拿到数据就返回去
// getId 要判断是不是空选择器，ClassName 要做判断处理
// get 就是处理选择器的环节，负责分配选择器类型，通过正则表达式来判断，
// select ,这里就是面对复杂类型的上下文进行判断的，调用他的时候，他接收到形参
// 了，就要处理上下文，最后拿到数据是一个数组，还要返回去，
//
//设置操作
//Me("div").css("color","red");--> 样式操作
//Me("div").css({"color":"red","font-size":"30px"});--> 传入对象，多个设置
//
//读取操作
//var color = Me("div").css("color");
//
//类样式 操作：
//Me("div").addClass("cls");
//Me("div").removeClass("cls");
//Me("div").hasClass("cls");
//Me("div").toggleClass("cls");

