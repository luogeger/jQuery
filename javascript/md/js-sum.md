# 变量、作用域和内存问题 - variable、scope、RAM

**``编程语言最重要的是存储，并非计算，所以需要一套规则，这套规则就是作用域.js的作用域是基于函数的，函数的功能：隐藏变量.``**

## 1. 执行环境及作用域

### 1.1 执行环境

- 执行环境``excution context,也叫环境``
- 执行环境是JavaScript最重要的一个概念，执行环境定义了变量或函数有权访问的其他数据，决定了他们的各自的行为。
- 每个执行环境都有一个与之关联的``变量对象variableObject``,环境中定义的所有``变量和函数``都保存在这个对象中。虽然我们编写的代码无法访问到这个对象，但解析器在处理数据的时候会在后台使用它。

### 2.1 全局执行环境

- 全局执行环境是最外围的一个执行环境。
- 在web浏览器中，全局执行环境被认为是window对象（第7章)
- 全局变量和函数都是作为window对象的属性和方法创建的，全局执行环境直到应用程序退出--例如关闭网页或浏览器--时才会被销毁
- 所以，某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁

    - 每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript程序中的执行流正是由这个方便的机制控制着
    - 代码在一个环境中执行时，**函数在执行时**会创建变量对象的一个``作用域链``。
    - ``作用域链的用途``：保证对执行环境有权访问的所有变量和函数的有序访问。
    - 作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，就把它的``活动对象activation object``作为变量对象。
    - ``活动对象``在最开始时只包含一个变量，是``arguments对象``**这个对象在全局环境中是不存在的**。
    - 作用域链中的下一个变量对象来自``包含环境``，而再下一个变量对象则来自下一个``包含环境``。这样，一直延续到全局执行环境
    - 全局执行环境的变量对象始终都是作用域链中的最后一个对象。
    - [标识符](http://www.jb51.net/article/77391.htm)解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级的向后回溯，直到找到标识符为止。如果找不到标识符，通常会发生错误。
    - ``标识符是指变量、函数、属性的名字，或者函数的参数``

```javascript
    var color = 'blue';

    function changeColor (){
        if(color == 'blue'){
            color = 'red';
        }
        else{
            color = 'blue';
        }
    };

    console.log(color );// 返回的是blue
```

- 此时的changeColor()的作用域包含2个对象：它自己的变量对象``其中定义着arguments对象``和全局环境的变量对象。函数内部之所以能访问到变量color，就是因为在自己的作用域链中能找打它。

## 2.闭包 - Closure

**``闭包是指有权访问另一个函数作用域中的变量的函数。首先，它是一个函数；另外，具有访问其他作用域中变量的功能。``**

- 常见创建方式：在一个函数内部创建另一个函数

## 3. 构造函数、原型对象 - constructor、prototype

### 3.1 工厂模式
```javascript
function create (name, age){
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.say = function() {
      alert(this.name);
    }
    return obj;
};

var person1 = create('lili', 18);
var person2 = create('lucy', 19);
```
- 运行函数，就可以创建一个对象。
- 缺点：

    - 只能生产固定对象。
    - 无法识别对象，不知道对象类型。
> 3大基本数据可以用typeof运算符来识别类型，但是复杂类型用typeof查询，得到的只能是Object，所以typeof对复杂数据没有意义。识别对象类型用的是constructor运算符，在这里依然没有效果。

```javascript
console.log(person1.constructor == Object);//true - 这里的Object必须大写
console.log(person2.constructor == Object);//true
```

### 3.2 构造函数模式

```javascript
function Person (name, age){
    this.name = name;
    this.age = age;
    this.say = function (){
        alert(this.name);
    };
};

var person1 = new('lili', 18);
var person2 = new('lucy', 19);
```

- 1.这里用到this和new这2个关键字。
- 2.没有显示地创建对象。
- 3.直接将属性和方法赋给了this对象。
- 4.没有return语句。
- 5.通过constructor属性能知道对象的构造函数。

> 构造函数是有缺点的。它内部的属性和方法都是独立的，不能共享。在创建实例对象的时候，构造函数里面的属性是有差异化的，需要在实例对象的时候传参数。但是里面的方法都是一样的，在实例对象的时候就会出现重复运行代码，而且还白白浪费内存。所以就有了原型模式。

### 3.3 原型模式

> **因为所有的实例是可以分享原型上面的属性和方法。所以，把需要给实例公用的方法设置在原型对象上。而那些有差异化的属性写在构造函数内部。**

```javascript
//3.3.1
function Person (name, age,job){
        this.name = name;
        this.age = age;
        this.job = job;
    };

Person.prototype.say = function (){
      console.log(this.name);
  };

var p1 = new Person('lili', 18, 'java');
var p2 = new Person('lucy', 19, 'HTML');

p1.say();// lili
p2.say();// lucy
```

> **像这样在原型上面扩展方法，确实好用，如果方法多了，会觉得代码很冗余，很麻烦。**

```javascript
//3.3.2
Person.prototype.say = function (){
    console.log(this.name);
};

Person.prototype.read = function (){
        console.log(this.age);
    };

Person.prototype.speak = function (){
            console.log(this.job);
        };

var p1 = new Person('lili', 18, 'java');
var p2 = new Person('lucy', 19, 'HTML');
var p3 = new Person('jim', 20, 'c++');

p1.say();// lili
p2.read();// 19
p3.speak();// C++

```

> **所以，有一种简单的原型语法，原型对象也是对象，可以把这些方法放到一个对象里面，然后赋值个原型对象。**

```javascript
//3.3.3
    Person.prototype = {
        say: function (){
            console.log(this.name);
        },
        read: function (){
            console.log(this.age);
        },
        speak: function (){
            console.log(this.job);
        }
    };

    console.log(p1.constructor == Person);// - false
    console.log(p1.constructor == Object);// - true
    console.log(p1.constructor);// - function Object() { [native code] }
```

> **pit: 也许是我想的有点多了，这里还是有个坑，实例的constructor的属性，应该指向的是原型对象，现在原型对象被重新赋值了之后，实例的constructor并没有指向这个新对象，还是指向原型对象，所以要改变constructor的指向，让它指向这个新对象**

```javascript
//3.3.4
    Person.prototype = {
        constructor: Person, // 加了这行代码，改变constructor的指针方向
        say: function (){
            console.log(this.name);
        },
        read: function (){
            console.log(this.age);
        },
        speak: function (){
            console.log(this.job);
        }
    };

    console.log(p1.constructor == Person);// - true
    console.log(p1.constructor == Object);// - false
    console.log(p1.constructor);// - function Person(name, age,job){
                                //        this.name = name;
                                //        this.age = age;
                                //        this.job = job;
                                //    }

    console.log(Person.prototype.propertyIsEnumerable('constructor')); // - true
```

> **pit: 你以为这样就结束了吗？ 不要你以为的就是你以为的。本来constructor这个属性在原型上面是不能被枚举，可以在3.3.1的代码块加上下面的这行代码验证**

```javascript
//在3.3.1代码块下面加上这行代码验证
console.log(Person.prototype.propertyIsEnumerable('constructor'));// - false
```

> **虽然constructor的默认属性被修改了，我们还是有解决方案。**

```javascript
//Object.defineProperty().这个方法是重设构造函数，只适用于ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
});
console.log(Person.prototype.propertyIsEnumerable('constructor')); // - false
```

> **可见，想用简单的原型写法，连续做了这么多事情，所以在正常开发中，还是不建议这么写**

#### 3.2.1 new、this、return
- new关键字做了4件事情
    - 1.创建一个新对象。
    - 2.把构造函数的作用域赋值给新对象。（所以，this指向了这个新对象）
    - 3.执行构造函数里面的代码。（给这个新对象添加属性和方法）
    - 4.返回新对象。

- this的4种指向和函数的调用.``this指向的肯定是个对象``
    - 1.当成普通函数调用，this指向全局对象window
    - 2.作为对象的方法调用，this指向这个对象。
    - 3.作为构造函数调用，this指向的是返回的这个新对象
    - 4.强行转换this指向。apply()、call()、bind()

#### 3.2.2 [apply()、call()、bind()](http://www.admin10000.com/document/6711.html) [git](http://www.admin10000.com/document/6711.html)
```javascript
        function box (a, b, c){
            console.log(typeof this);
            console.log(a, b, c);
        };

        //call, apply, bind
        //1. 不传参数的情况下，
        //    call: 执行函数
        //    apply: 执行函数
        //    bind: 返回一个新的函数，和这个函数一样
        //        执行函数的结果
        //            1. object
        //            2. undefined undefined undefined
        //            
        //2. 传一个参数 box
        //    box.call( new Date() );
        //    box.apply( new Date() );
        //    box.bind( new Date() );
        //        还是和上面一样。bind依然不会执行
        //        
        //3. 正常传参
        //  三者都是用来改变函数的this对象的指向的；
        //  三者第一个参数都是this要指向的对象，也就是想指定的上下文；
        //  三者都可以利用后续参数传参；
        //  bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
```            

- **javaScript语言有一大特点，函数的存在有上下文``context``这样一个概念。** 就像我们说话时的语境一样，同样的话语在不同的语境之下，表达意思是不一样的。

    - 声明时上下文
    - 运行时的上下文
    - 上下文是可以改变的

- js中call和apply都是为了改变某个函数运行时的上下文而存在的，换句话说，就是为了改变函数内部this的指向

#### 3.2.3 常用检测方法
- **obj.hasOwnProperty('name');**
    - 检测obj对象有没有name这个属性。判断这个属性是自身的还是继承过来的。
    - 返回值是 true或false

- **obj.isPrototypeOf(obj123);**
    - 检测obj是不是obj123的原型对象，返回值也是Boolean

- **obj instanceof obj123**
    - 检测obj是不是obj123的实例。
```javascript
    alert(arr instanceof Array); // 返回false, arr没有定义
```

- **Object.getPrototypeOf(person1).name**
    - 获取person1原型对象上面的name属性，前面Object的O必须大写
```javascript
    console.log(Object.getPrototypeOf(person1).name);//如果有定义name，返回"lucy"
```

- **obj.propertyIsEnumerable('name');**
    - 检测obj能不能枚举到这个属性，也能设置一个。

- **Object.defineProperty(obj123, 'name', {});**
    - 设置和修改obj123里的name属性。
```javascript
    var person = {};
    Object.defineProperty(person, 'age', {
        //enuberable: false,//``应该是指这个属性不能被枚举``
        writable: false, //表示这个属性不可以重新赋值
        value: 30,
    })
    person.age = 50;
    console.log(person.age);// 30

    var num;
    var lucy = {};
    Object.defineProperty(lucy, 'age', {
        get:function (){     //获取num属性的时候会先执行这个函数
            return num || 0; //短路运算
        },
        set:function (a){
            if( a>20 ){
                num = a;
            }
        }
    });
    lucy.age = 18;
    console.log(lucy.age);// 0

    lucy.age = 21;
    console.log(lucy.age);// 21


```