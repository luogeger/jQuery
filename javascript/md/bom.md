### 可视区、偏移区、滚动区
- `width` `height`
```javascript
    console.log(d.style.width);     //只能获得内容的宽度，而是行内的           == 220px
    console.log(d.style.height);    // style 只能获取行内样式                 == ''
    console.log(d.offsetWidth);     // width+padding+border                 == 300
    console.log(d.offsetHeight);    //padding+height+border                 == 280
```

- `offset`
```javascript
    offsetLeft == 自己的外边框距离 - 父盒子的内边框的距离(不包含边框)
```

- 页面可视区域大小
```javascript
    //获取页面可视区域的大小
    function client() {
        return {
            clientWidth: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth || 0,
            clientHeight : window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight || 0
        };
    }
```

- location
```javascript
    btn.onclick = function () {
        //  location.href = "xxx.html";

        //  刷新   -- 浏览器自己决定 可能会读取缓存
        //  ocation.reload();
        //  不管浏览器是否有缓存，都去服务器获取页面
            location.reload(true);
    }
```

- screen
```javascript
    //获取屏幕的分辨率
    console.log(screen.width);
    console.log(screen.height);

    //获取屏幕的大小，除去任务栏
    console.log(screen.availWidth);
    console.log(screen.availHeight);
```
