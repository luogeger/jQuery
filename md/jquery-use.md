- 尺寸
```javascript
    $(ele).width()
    $(ele).height()
```

- 坐标
```javascript
    $(ele).offset().top;
    $(ele).offset().left; // 当前元素离页面左上角

    $(ele).position().top;
    $(ele).position().left;// 相对于有定位的父元素
```

- 滚动
```javascript
    $(document).scroll(function () {
        $(this).scrollTop();
        $(this).scrollLeft();
    })
```

- 鼠标位置
```javascript
    e.screenX       屏幕左上角
    e.offsetX       相对于当前点击元素的位置
    e.clientX       页面左上角
    e.pageX         页面左上角 + 滚动距离
```

- 事件对象
```javascript
    e.type
    e.ctrlkey / e.altkey / e.shiftkey == true | false ; 点击的时候是否被按中
    e.target
    e.currentTarget == $(this)
    e.delegateTarget
    e.preventDefault()
    e.stopPropagation()
```

- `on()` 方法保存数据
```javascript
    $(ele).on('click', data, function (e) {
        // e.data 等于 data
    })
```



















