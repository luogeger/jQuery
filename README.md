# jquery原理分析

## 1.结构分析
```javascript
    (function (){
        var $ = function  (name, age, job){
            return new $.prototype.init(name, age, job);
        };
        
        $.prototype = {
            constructor: $, // pit
            init: function (name, age, job){
                this.name = name;
                this.age = age;
                this.job = job;
            },
            say: function (){
                console.log(this.name);
            },
            read: function (){
                console.log(this.age);
            }
        }

        $.prototype.init.prototype = $.prototype;
        
        return window.$ = $;
    })();
    
    var lucy = $('lucy', 19, 'java');
    console.log(lucy);
```
















































