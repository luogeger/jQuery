- [jQuery事件](http://www.itdadao.com/articles/c15a1210874p0.html)

> [插件](http://www.cnblogs.com/joey0210/p/3408349.html)
```javascript
(function ($) {
    $.fn.extend({
        "bold": function () {
            return this.css({ fontWeight: "bold" });
        }
    });
})(jQuery);
```
- jquery提供了jQuery.extend()和jQuery.fn.extend()方法。
```javascript
jQuery.extend({
    "minValue": function (a, b) {
        return a < b ? a : b;
    },
    "maxValue": function (a, b) {
        return a > b ? a : b;
    }
});
var i = 100; j = 101;
var min_v = $.minValue(i, j); // min_v 等于 100
var max_v = $.maxValue(i, j); // max_v 等于 101
```

- 重载版本：jQuery.extend([deep], target, object1, [objectN])

        用一个或多个其他对象来扩展一个对象，返回被扩展的对象。

        如果不指定target，则给jQuery命名空间本身进行扩展。这有助于插件作者为jQuery增加新方法。

        如果第一个参数设置为true，则jQuery返回一个深层次的副本，递归地复制找到的任何对象。否则的话，副本会与原对象共享结构。

        未定义的属性将不会被复制，然而从对象的原型继承的属性将会被复制。

        参数：

        deep:       可选。如果设为true，则递归合并。

        target:     待修改对象。

        object1:   待合并到第一个对象的对象。

        objectN:   可选。待合并到第一个对象的对象。

```javascript
//示例1：合并 settings 和 options，修改并返回 settings。

var settings = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
jQuery.extend(settings, options);

settings == { validate: true, limit: 5, name: "bar" }

//示例2：合并 defaults 和 options, 不修改 defaults。

var empty = {};
var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
var settings = jQuery.extend(empty, defaults, options);

settings == { validate: true, limit: 5, name: "bar" }
empty == { validate: true, limit: 5, name: "bar" }

//这个重载的方法，我们一般用来在编写插件时用自定义插件参数去覆盖插件的默认参数。
```
**jQuery.fn.extend(object)扩展 jQuery 元素集来提供新的方法（通常用来制作插件）。''**

```javascript
//首先我们来看fn 是什么东西呢。查看jQuery代码，就不难发现。
jQuery.fn = jQuery.prototype = {
　　　init: function( selector, context ) {.....};
};
```
> 原来 jQuery.fn = jQuery.prototype，
也就是jQuery对象的原型。那jQuery.fn.extend()方法就是扩展jQuery对象的原型方法。
我们知道扩展原型上的方法，就相当于为对象添加”成员方法“，类的”成员方法“要类的对象才能调用，
所以使用jQuery.fn.extend(object)扩展的方法，
jQuery类的实例可以使用这个“成员函数”。
jQuery.fn.extend(object)和jQuery.extend(object)方法一定要区分开来。