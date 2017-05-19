/**
 * Created by luogege on 2017.05.18.
 */
(function (window){
    var $ = function (select, context) {
        return new $.fn.init(select, context);
    };

    $.fn = $.prototype = {
        constructor: $,
        init: function (select, context){
                context = context || document;
                this.eleList = document.querySelectorAll(select, context);
                return this;
        },
    }

    $.fn.init.prototype = $.prototype;//修改原型链指向
    window.$ = $;
})(window);



// js.fn.init.prototype = luo.prototype;// 这3步做了些什么事情。