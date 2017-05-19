# jquery原理分析

## 1.**getElementById太长了**
```javascript
var $ = function  (id){
    return document.getElementById(id);
};
```
## 2.DOM元素
如果点击按钮，让2张图片隐藏，如下
```javascript
$('button').onclick = function (){
    $("image1").style.display = "none";
    $("image2").style.display = "none";
};
//问题又来了，出现了重复代码, 希望能变成下面形式的代码
$("button").onclick = function() {
    $("image1").hide();
    $("image2").hide();
};
```
``$('image')``获取的是dom元素，它是没有``hide()``这个方法的，希望它有这个方法，可以到DOM的原型对象上面添加这个方法
```javascript
HTMLElement.prototype.hide = function  (){
    this.style.display = 'none';
};
```
到这里，貌似找到感觉了。但是IE系列不支持``HTMLeLElement``DOM的原型扩展，还好，这些狗日东西认识``Function``的原型扩展
















































