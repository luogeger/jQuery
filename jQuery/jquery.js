;
(function (root){
    //构造函数
    var jQuery = function (selector){
        //在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数
        //返回的是init的实例，init是jQuery原型对象上面的一个方法。
        return  new jQuery.fn.init(selector);

    };

    //修改原型链的指向，重新命名
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        init: function (selector){
            //这里需要判断是创建元素还是获取元素
        },

        //在原型上面添加各种方法
        toArray:function  (){
        },
        get:function (){
        },
        each:function (){
        },

    };//原型链重命名 - end


    jQuery.fn.init.prototype = jQuery.fn;

    //实现jQuery的两种扩展方式
    jQuery.extend = jQuery.fn.extend = function (){

    };

    //静态成员 - 在构造函数上面扩展
    jQuery.extend({
        ajax: function (){
        },
        type: function (){
        },
        parseHTML: function (){
        },
        parseJSON: function (){
        }
    });

    //静态成员 - 在原型对象上面扩展
    jQuery.fn.extend({
        val: function() {},
        css: function() {},
        attr: function() {},
        prop: function() {},
        queue: function() {},
        promise: function() {},
    })


})(window);