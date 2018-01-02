- 1.禁止右键菜单使用
```javascript
    $(function (){
        $(document).bind('contextmenu', function (e){
            return false;
        })
    })
```

- 2.新窗口打开页面
```html
    <a href="https://baidu.com" rel="external"></a>
```
```javascript
    $(function (){
        // 通过a标签的href属性来寻找元素
        $('a[href^="https://"]').attr('target', '_blank');
        
        // 通过rel来寻找元素
        $('a[rel$="external"]').click(function (){
            this.target = "_blank";
        })
    })
```

- 3.基于jquery扩展元素居中方法
```javascript
    $(function (){
        jQuery.fn.center = function (){
            var top = ($(window).height() - this.height()) / 2 + $(window).scrollTop() + 'px';
            var left = ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + 'px';
            this.css('position', 'absolute');
            this.css('top', top);
            this.css('left', left);
            return this;
        }
        
        $('#id').center();
    })
```

- 4.检测鼠标的左键和右键
```javascript
    $(function (){
        $('#id').mousedown(function (e){
            console.log(e.which); // 1 = left, 2 = center, 3 = right
            
        })
    })
```

- 5.扩展String对象
```javascript
    $.extend(String.prototype, {
        // 正整数
        isPositiveInteger: function (){
            return (new RegExp(/^[1-9]\d*$/).test(this));
        },
         
        // 整数
        isInteger: function (){
            return (new RegExp(/^\d+$/).test(this));
        }
        
    });
```




















