# javaScript

- [前端js](http://www.open-open.com/lib/view/1477554149593)

```javascript
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}


Foo.getName();//2
getName();//4  --> (函数和变量声明提前)函数声明定义虽然会覆盖变量定义，但是变量的赋值，却是在覆盖之后
Foo().getName();//1 --> Foo执行, 把getName重新赋值来了, 返回的this, 指向的的调用的全局对象window
getName();//1 --> 同上, 调用的是全局的getName

new Foo.getName();//2
    // Foo.getName;
    // new Foo.getName;
    // new Foo.getName();

new Foo().getName();//3
    // new Foo(); --> return this, 指向的instance
    // 再调用instance的方法, 但是instance没有, 只能去instance的prototype上面去寻找
     5 1
new new Foo().getName();//3
```

```javascript
    var person = {
        name: 'tom',
        weight: '100kg',
        showName: function (){
            console.log(this.name);
        },
        showWeight: function (){
            return function (){
                console.log(this.weight);
            }
        },
        showWeight2: function (){
            return (function (){
                console.log(this.weight);
            }).bind(this);
        }
    };

    person.name = 'jack';
    person.weight = '60kg';

    var showName = person.showName;
    var showWeight = person.showWeight();
    var showWeight2 = person.showWeight2();

    (person.showWeight())();//undefined
    showWeight();//undefined

    (person.showWeight2())();//60kg
    showWeight2();//60kg
    showWeight2.call(this);//60kg

    person.showName();//jack
    showName();// 空
    person.showName.call(person);//jack
    person.showName.apply(window);//空
```

- 去重
```javascript
Array.prototype.unique = function(){
    this.sort();
    var re=[this[0]];
    for(var i = 1; i < this.length; i++){
        if( this[i] !== re[re.length-1]){
            re.push(this[i]);
        }
    }
    return re;
 }
```

- 并集
```javascript
 Array.prototype.union = function(a){
   return this.concat(a).unique();
}
```

- 交集
```javascript
Array.prototype.intersect = function(b) {
    var result = [];
    var a = this;
    for(var i = 0; i < b.length; i ++) {
        var temp = b[i];
        for(var j = 0; j < a.length; j ++) {
            if(temp === a[j]) {
                result.push(temp);
                break;
            }
        }
    }
    return result.unique();
}
```


- 差集
```javascript
Array.prototype.minus = function(a){
    var result =[];
    var clone = this;
        for(var i=0; i < clone.length; i++){
            var flag = true;
            for(var j=0; j < a.length; j++){
                if(clone[i] == a[j])
                    flag = false;
            }
            if(flag){
                result.push(clone[i]);
            }
        }
    return result.unique();
}
```
